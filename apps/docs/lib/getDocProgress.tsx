import fs from "fs/promises";
import path from "path";

export interface DocProgress {
  total: number;
  completed: number;
  incompleted: number;
  percentage: number;
};

export interface ProjectProgress {
  project: string;
  progress: DocProgress;
};

const ROOT = path.join(process.cwd(), "content", "documentation");
const MIN_LENGTH = 150;

export async function getDocProgress(): Promise<ProjectProgress[]> {
  let totalFiles = 0;
  let completedFiles = 0;

  async function walk(dir: string): Promise<DocProgress> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name !== "header.mdx") {
        totalFiles ++;
        try {
          const content = await fs.readFile(fullPath, "utf-8");
          if (content.trim().length >= MIN_LENGTH || ["0-function.mdx", "0-overview.mdx"].includes(entry.name)) {
            completedFiles++;
          } else {
            const currLength = Math.round((content.trim().length / MIN_LENGTH) * 10000) / 10000;
            completedFiles += currLength;
          }
        } catch (error) {
          console.error("Failed to read file:", error);
        }
      }
    }
    const percentage = totalFiles === 0 ? 0 : Math.round((completedFiles / totalFiles) * 10000) / 100;
    return {
      total: totalFiles,
      completed: Math.floor(completedFiles),
      incompleted: totalFiles - completedFiles,
      percentage
    }
  }

  const result: ProjectProgress[] = [];
  const docEntries = await fs.readdir(ROOT, { withFileTypes: true });
  const projects = docEntries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const project of projects) {
    const data = await walk(path.join(ROOT, project));
    result.push({
      project: project.replace(/-/g, "").replace(/\b\w/g, char => char.toUpperCase()),
      progress: data
    });
    totalFiles = 0;
    completedFiles = 0;
  }

  for (const res of result) {
    totalFiles += res.progress.total;
    completedFiles += res.progress.completed;
  }

  const percentage = totalFiles === 0 ? 0 : Math.round((completedFiles / totalFiles) * 10000) / 100;
  result.unshift({
    project: "Total",
    progress: {
      total: totalFiles,
      completed: completedFiles,
      incompleted: totalFiles - completedFiles,
      percentage
    }
  });
  return result;
};