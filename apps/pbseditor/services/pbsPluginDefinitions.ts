export interface PBSPluginDefinition {
  id: string;
  folderName: string;
  configKey: "arckyRMPlugin" | "arckyPMPlugin"
}

export const PBS_PLUGIN_DEFINITIONS: PBSPluginDefinition[] = [
  {
    id: "arcky-region-map",
    folderName: "Arcky's Region Map",
    configKey: "arckyRMPlugin"
  },
  {
    id: "arcky-poke-market",
    folderName: "Arcky's Poke Market",
    configKey: "arckyPMPlugin"
  }
];