"use client";
import { usePathname, useRouter } from "next/navigation";
import { LabelAndTooltip } from "ui";
import { usePBSConfig } from "@/providers/PBSConfigProvider";
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  setLanguageCookie
} from "@/config/languages";
import InputSelect from "ui/src/components/InputSelect";

export default function EditorSettings () {
  const { config, updatePreferences } = usePBSConfig();
  const router = useRouter();
  const pathname = usePathname();

  function handleLanguageChange(lng: string | null) {
    if (!lng) return;
    updatePreferences({ language: lng });
    setLanguageCookie(lng);

    const segments = pathname.split("/");
    segments[1] = lng;
    router.push(segments.join("/") + window.location.hash);
  }

  return (
    <>
      <LabelAndTooltip
        label={["language"]}
        infoData={["Set the Editor to a prefered language."]}
      />
      <InputSelect
        width={200}
        initValue={config.preferences.language}
        initLabel={LANGUAGE_LABELS[config.preferences.language] ?? config.preferences.language}
        handleChange={(e) => handleLanguageChange(String(e?.value))}
        options={SUPPORTED_LANGUAGES.map(lng => ({ label: LANGUAGE_LABELS[lng], value: lng }))}
      />
    </>
  );
}