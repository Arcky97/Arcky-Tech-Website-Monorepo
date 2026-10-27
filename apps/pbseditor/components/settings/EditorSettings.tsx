"use client";
import { LabelAndTooltip, ToggleSwitch } from "ui";
import { usePBSConfig } from "@/providers/PBSConfigProvider";
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES
} from "@/config/languages";
import InputSingleSelect from "ui/src/components/InputSingleSelect";
import { useT } from "next-i18next/client";

export default function EditorSettings () {
  const { t: tSettings } = useT('settings');
  const { config, updatePreferences } = usePBSConfig();

  // the language is applied (cookie + navigation) when the config modal closes
  function handleLanguageChange(lng: string | null) {
    if (!lng) return;
    updatePreferences({ language: lng });
  }

  return (
    <div className="p-2">
      <div className="mb-4">
        <LabelAndTooltip
          label={[tSettings('preferences.language.label')]}
          infoData={[tSettings('preferences.language.info')]}
        />
        <InputSingleSelect
          width={"w-64"}
          initValue={config.preferences.language}
          initLabel={LANGUAGE_LABELS[config.preferences.language] ?? config.preferences.language}
          handleChange={(e) => handleLanguageChange(String(e?.value))}
          options={SUPPORTED_LANGUAGES.map(lng => ({ label: LANGUAGE_LABELS[lng], value: lng }))}
        />
      </div>
      <div className="mb-4">
        <LabelAndTooltip
          label={[tSettings('preferences.autosave.label')]}
          infoData={[tSettings('preferences.autosave.info')]}
        />
        <ToggleSwitch
          state={config.preferences.autosave}
          onChange={(value) => updatePreferences({ autosave: value })}
        />
      </div>
      <div className="mb-4">
        <LabelAndTooltip
          label={[tSettings('preferences.unitsystem.label')]}
          infoData={[tSettings('preferences.unitsystem.info')]}
        />
        <div className="flex space-x-6">
          {["Metric", "Imperial"].map(option => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer select-none text-white">
              <input
                type="radio"
                name="unit-system"
                value={option}
                checked={config.preferences.unitSystem === option}
                onChange={(e) => updatePreferences({ unitSystem: e.target.value === "Imperial" ? "Imperial" : "Metric" })}
                className="accent-blue-500 cursor-pointer"
              />
              <span className="font-semibold text-lg">{tSettings(`preferences.unitsystem.${option.toLowerCase() as 'metric' | 'imperial'}`)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <LabelAndTooltip
          label={[tSettings('preferences.notypelimit.label')]}
          infoData={[tSettings('preferences.notypelimit.info')]}
        />
        <ToggleSwitch
          state={config.preferences.noTypeLimit}
          onChange={(value) => updatePreferences({ noTypeLimit: value })}
        />
      </div>
    </div>
  );
}