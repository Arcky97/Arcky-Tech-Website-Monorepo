"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import type { PBSConfig, PBSUserPreferences, PBSProjectConfig, PBSCustomDefinitions } from "@/types/pbsConfig";

import { DEFAULT_CONFIG } from "@/config/defaultConfig";
import { loadPBSConfig, savePBSConfig } from "@/services/pbsConfigStorage";

interface PBSConfigContextValue {
  confg: PBSConfig;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  updatePreferences: (
    updates: Partial<PBSUserPreferences>
  ) => void;

  updateProjects: (
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

    useEffect(() => {
      let cancelled = false;

      async function initialize() {
        try {
          const stored = await loadPBSConfig();

          if (!cancelled && stored) {
            setConfig(stored);
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

    
  }