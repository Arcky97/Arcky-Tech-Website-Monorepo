import { PBS_PLUGIN_DEFINITIONS } from "./pbsPluginDefinitions";

const REQUIRED_FOLDERS = ["Graphics", "Plugins", "PBS"] as const;

export interface DetectedPBSPlugins {
  arckyRMPlugin: boolean;
  arckyPMPlugin: boolean;
}

export interface PBSProjectValidationResult {
  valid: true;
  plugins: DetectedPBSPlugins;
}

export async function validatePBSProjectFolder(
  root: FileSystemDirectoryHandle
): Promise<PBSProjectValidationResult> {
  const rootEntries = new Set<string>();

  for await (const [name, handle] of root.entries()) {
    if (handle.kind === "directory") {
      rootEntries.add(name.toLocaleLowerCase());
    }
  }

  const missingFolders = REQUIRED_FOLDERS.filter(
    folder => !rootEntries.has(folder.toLocaleLowerCase())
  );

  if (missingFolders.length > 0) {
    throw new Error(
      `Invalid Pokémon Essentials project. Missing required folder(s): ${
        missingFolders.join(", ")
      }.`
    );
  }

  const pluginsDirectory = await root.getDirectoryHandle("Plugins");
  const installedPluginFolders = new Set<string>();

  for await (const [name, handle] of pluginsDirectory.entries()) {
    if (handle.kind === "directory") {
      installedPluginFolders.add(normalizeName(name));
    }
  }

  const detectedPlugins: DetectedPBSPlugins = {
    arckyRMPlugin: false,
    arckyPMPlugin: false
  };

  for (const plugin of PBS_PLUGIN_DEFINITIONS) {
    const installed = installedPluginFolders.has(
      normalizeName(plugin.folderName)
    );

    detectedPlugins[plugin.configKey] = installed;
  }

  return {
    valid: true,
    plugins: detectedPlugins
  };
}

function normalizeName(name: string): string {
  return name 
    .normalize("NFC")
    .trim()
    .toLocaleLowerCase();
}