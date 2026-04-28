import path from "path";
import fs from "fs";

if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
  console.log("⏭️ generateUpdates skipped (not production)");
  process.exit(0);
}

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_WEBSITE = process.env.API_KEY_WEBSITE;
if (!API_BASE_URL || !API_KEY_WEBSITE) {
  throw new Error("Missing API environment variables");
}

const ROOT = path.join(process.cwd(), "content/documentation");

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
        const raw = file.replace(".mdx", "");

        // 1. remove suffix like -a, -b, etc.
        const withoutSuffix = raw.replace(/-[a-z]$/i, "");

        // 2. remove all spaces
        const cleaned = withoutSuffix.replace(/\s+/g, "");

        // 3. split into parts
        const [year, month, day] = cleaned.split("-");

        // 4. normalize with leading zeros
        const normalizedDateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

        // 5. safe date
        const fileDate = new Date(`${normalizedDateStr}T00:00:00Z`);
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
          date: normalizedDateStr,
          title,
          excerpt,
          slug: `/documentation/${dir.name}/update-history#${normalizedDateStr}`
        });
      }
    }
  }

  const updatesToJson = updates
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse();

  console.log("📦 Sending updates:", updatesToJson);

  try {
    const res = await fetch(`${API_BASE_URL}/api/updates/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY_WEBSITE
      },
      body: JSON.stringify({ updates: updatesToJson })
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("❌ API ERROR:", res.status, text);
      process.exit(1);
    }

    console.log("✅ API SUCCESS:", text);
  } catch (error) {
   console.log(`❌ Writting Updates to Databse at '${API_BASE_URL}/api/updates/v1' failed!`);
  }
}

generateUpdates();