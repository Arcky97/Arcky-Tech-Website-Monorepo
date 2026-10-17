"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import type { PBSConfig, PBSUserPreferences, PBSProjectConfig, PBSCustomDefinitions } from "@/types/pbsConfig";

import { DEFAULT_CONFIG } from "@/config/defaultConfig";
import { loadPBSConfig, savePBSConfig } from "@/services/pbsConfigStorage";
import PBSConfigModal from "@/components/settings/PBSConfigModal";

interface PBSConfigContextValue {
  config: PBSConfig;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  updatePreferences: (
    updates: Partial<PBSUserPreferences>
  ) => void;

  updateProject: (
    updates: Partial<PBSProjectConfig>
  ) => void;

  updateDefinitions: (
    updates: Partial<PBSCustomDefinitions>
  ) => void;

  resetConfig: () => void;
  saveNow: () => Promise<void>;

  isConfigModalOpen: boolean;
  openConfigModal: () => void;
  closeConfigModal: () => void;
}

const PBSConfigContext =
  createContext<PBSConfigContextValue | null>(null);

  export function PBSConfigProvider({
    children
  }: {
    children: ReactNode
  }) {
    const [config, setConfig] = useState<PBSConfig>(() =>  structuredClone(DEFAULT_CONFIG));

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);

    useEffect(() => {
      let cancelled = false;

      async function initialize() {
        try {
          const stored = await loadPBSConfig();

          if (!cancelled && stored) {
            setConfig(stored);

            if (!stored.setupCompleted) {
              setIsFirstTimeSetup(true);
              setIsConfigModalOpen(true);
            }
          } else {
            const initialConfig = structuredClone(DEFAULT_CONFIG);
            
            await savePBSConfig(initialConfig);

            setConfig(initialConfig);
            setIsFirstTimeSetup(true);
            setIsConfigModalOpen(true);
          }
        } catch (error) {
          if (!cancelled) {
            setError(
              error instanceof Error 
                ? error.message
                : "Failed to load configuration."
            );
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      }

      void initialize();

      return () => {
        cancelled = true;
      };
    }, []);

    const updatePreferences = useCallback(
      (updates: Partial<PBSUserPreferences>) => {
        setConfig(current => ({
          ...current,
          preferences: {
            ...current.preferences,
            ...updates
          }
        }));
      },
      []
    );

    const updateProject = useCallback(
      (updates: Partial<PBSProjectConfig>) => {
        setConfig(current => ({
          ...current,
          project: {
            ...current.project,
            ...updates
          }
        }));
      },
      [] 
    );

    const updateDefinitions = useCallback(
      (updates: Partial<PBSCustomDefinitions>) => {
        setConfig(current => ({
          ...current,
          definitions: {
            ...current.definitions,
            ...updates
          }
        }));
      },
      []
    );

    const resetConfig = useCallback(() => {
      setConfig(structuredClone(DEFAULT_CONFIG));
    }, []);

    useEffect(() => {
      if (isLoading) return;

      let cancelled = false;

      const timeout = window.setTimeout(async () => {
        setIsSaving(true);

        try {
          await savePBSConfig(config);

          if (!cancelled) {
            setError(null);
          }
        } catch (error) {
          if (!cancelled) {
            setError(
              error instanceof Error
                ? error.message
                : "Failed to save configuration"
            );
          }
        } finally {
          if (!cancelled) {
            setIsSaving(false);
          }
        }
      }, 300);

      return () => {
        cancelled = true;
        window.clearTimeout(timeout);
      };
    }, [config, isLoading]);

    const saveNow = useCallback(async () => {
      setIsSaving(true);

      try {
        await savePBSConfig(config);
        setError(null);
      } catch (error) {
        const message =
          error instanceof Error 
            ? error.message
            : "Failed to save configuration";

        setError(message);
        throw error;
      } finally {
        setIsSaving(false);
      }
    }, [config]);

    const openConfigModal = useCallback(() => {
      setIsConfigModalOpen(true);
    }, []);

    const closeConfigModal = useCallback(() => {
      setIsConfigModalOpen(false);
    }, []);

    const completeFirstTimeSetup = useCallback(async () => {
      try {
        if (!config.setupCompleted) {
          const updatedConfig = {
            ...config,
            setupCompleted: true
          };

          await savePBSConfig(updatedConfig);

          setConfig(updatedConfig);
          setTimeout(() => (
            setIsFirstTimeSetup(false)
          ), 500); 
        }
        
        setIsConfigModalOpen(false);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to complete initial setup."
        );
      }
    }, [config]);

    const value = useMemo(
      () => ({
        config,
        isLoading,
        isSaving,
        error,
        updatePreferences,
        updateProject,
        updateDefinitions,
        resetConfig,
        saveNow,
        isConfigModalOpen,
        openConfigModal,
        closeConfigModal
      }),
      [
        config,
        isLoading,
        isSaving,
        error,
        updatePreferences,
        updateProject,
        updateDefinitions,
        resetConfig,
        saveNow,
        isConfigModalOpen,
        openConfigModal,
        closeConfigModal
      ]
    );

    return (
      <PBSConfigContext.Provider value={value}>
        {children}

        <PBSConfigModal
          isOpen={isConfigModalOpen}
          onCompleteSetup={completeFirstTimeSetup}
          onClose={closeConfigModal}
          requireSetup={isFirstTimeSetup}
        />
      </PBSConfigContext.Provider>
    );
  }

  export function usePBSConfig() {
    const context = useContext(PBSConfigContext);

    if (!context) {
      throw new Error(
        "usePBSConfig must be used within PBSConfigProvider."
      );
    }

    return context;
  }