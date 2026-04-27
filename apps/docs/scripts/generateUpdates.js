import path from "path";
import fs from "fs";

const ROOT = path.join(process.cwd(), "content/documentation");
const OUTPUT = path.join(process.cwd(), "public", "updates.json");

export async function generateUpdates() {
  const updates = [];

  const projects = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  for (const dir of projects) {
    const updateDir = path.join(ROOT, dir.name, "update-history");

    if (fs.existsSync(updateDir)) {
      const files = fs.readdirSync(updateDir)
        .filter(file => file.endsWith(".mdx") && !file.startsWith('header'))
        .sort()
        .reverse()

      for (const file of files) {
        const dateStr = file.replace(".mdx", "");
        const fileDate = new Date(dateStr);
        const today = new Date();

        if (fileDate > today) continue;

        const filePath = path.join(updateDir, file);
        const rawContent = fs.readFileSync(filePath, "utf-8");

        const title = rawContent.match(/^##\s+(.*)$/m)?.[1]?.trim() ?? "Unknown Update";

        const excerpt = (() => {
          const match = rawContent.match(/(### .*?)(?=\n### |\Z)/s);
          if (!match) return "";

          const lines = match[1]
            .split(/\r?\n/)
            .filter(line => line.trim() !== "");

          const limited = lines.slice(0, 5);

          const hasMore = lines.length > 5;

          return limited.join("\n") + (hasMore ? "\n..." : "");
        })();

        updates.push({
          project: dir.name,
          date: dateStr,
          title,
          excerpt,
          slug: `/documentation/${dir.name}/update-history#${dateStr}`
        })
        
        break;
      }
    }
  }

  const updatesToJson = updates
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
    .reverse();

  fs.writeFileSync(
    OUTPUT,
    JSON.stringify(updatesToJson, null, 2),
    "utf-8"
  );

  console.log(`✅ Updates written to ${OUTPUT}`);
}

generateUpdates();