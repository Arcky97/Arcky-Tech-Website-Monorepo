import fs from 'fs';
import path from 'path';

export type SpeciesEntry = {
  name: string;
  file: string;
}

const ROOT = path.join(process.cwd(), "public/images/scoreboard");

function getImageFilesFromFolder(folderName: string): string[] {
  const folderPath = path.join(ROOT, folderName);
  return fs.readdirSync(folderPath).filter(file => /\.(png|svg)$/i.test(file));
}

function getSpeciesName(fileName: string): string {
  return fileName
    .replace(/^\d{3}-/, "")
    .replace(/\.[^/.]+$/, "");
}

export function getAllSpecies(): SpeciesEntry[] {
  const allFiles = getImageFilesFromFolder("active");

  return allFiles.map((species: string) => ({
    name: getSpeciesName(species),
    file: species
  }));
}