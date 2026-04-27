import path from "path";
import fs from "fs";
import { redirect } from "next/navigation";
import { getStyles, NotFoundComp, slugify } from "ui";
import { DocsTableOfContents } from "@/components/DocsTableOfContents";

export default async function Page({
  params
}: {
  params: Promise<{ slug: string[]; }>
}) {
  const { slug } = await params;
  const nestedPath = slug.join('/');

  const updatesDir = path.join(
    process.cwd(),
    'content/documentation/', 
    nestedPath
  );

  if (!fs.existsSync(updatesDir)) {
    return (
      <NotFoundComp/>
    );
  }

  const files = fs
    .readdirSync(updatesDir)
    .filter(file => file.endsWith('.mdx'));

  if (files.length === 0) {
    const subFolders = fs
      .readdirSync(updatesDir)
      .filter(name => fs.statSync(path.join(updatesDir, name)).isDirectory());
    
    if (subFolders.length > 0) {
      const firstSub = subFolders[0];
      const firstSubDir = path.join(updatesDir, firstSub);
      const redFiles = fs
        .readdirSync(firstSubDir)
        .filter(file => file.endsWith('.mdx'));

      if (redFiles.length > 0) {
        const newSlug = [...slug, firstSub].join('/');
        redirect(`/documentation/${newSlug}`);
      } else {
        <NotFoundComp/>;
      }
    } else {
      <NotFoundComp/>;
    }
  }

  const isIndexedFormat = files.filter(file => file !== 'header.mdx').every(file => /^\d+-[^0-9]+.*\.mdx$/i.test(file));
  
  if (isIndexedFormat) {
    // All files start with index: sort by numeric prefix ascending
    files.sort((a, b) => {
      const indexA = parseInt(a.split('-')[0], 10);
      const indexB = parseInt(b.split('-')[0], 10);
      return indexA - indexB;
    });
  } else {
    // All files are date-formatted: sort by date descending
    files.sort((a, b) => {
      const baseA = a.replace('.mdx', '');
      const baseB = b.replace('.mdx', '');
      const dateA = new Date(baseA.split('-').slice(0, 3).join('-'));
      const dateB = new Date(baseB.split('-').slice(0, 3).join('-'));
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime();
      } else {
        return baseB.localeCompare(baseA);
      }
    });
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(updatesDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');

      const match = raw.match(/^## (.+)$/m);
      const title = match?.[1] || file.replace('.mdx', '');
      const anchorId = slugify(title);
      
      let Component;
      let layout = null;
      
      try {
        const mod = await import(
          `@/content/documentation/${nestedPath}/${file}`
        );
        Component = mod.default;
        layout = mod.layout || null;
      } catch (err) {
        console.error(`❌ Error loading MDX file: ${nestedPath}/${file}`, err);
        Component = function FailedToLoadComponent() {
          return (
            <div className="text-red-500 border border-red-500 bg-red-100 p-4 rounded">
              ⚠️ Failed to load <strong>{file}</strong>. Check the MDX syntax or code blocks.
            </div>
          )
        }
      }

      return { name: file.replace('.mdx', ''), title, anchorId, Component, layout }
    })
  );

  const tablePosts = posts.filter(({name}) => name !== 'header');
  const headerPost = posts.find(p => p.name === 'header');

  const pageLayout = headerPost?.layout || null;

  const styles = getStyles(pageLayout);

  return (
    <article key={slug[0]} className={`${styles.wrapper} pb-4`} >
      {styles.card && 
        <>
          {headerPost && (
            <>
              <headerPost.Component/>
            </>
          )}
          <section className="pb-6">
            <h3 className="text-2xl lg:text-3xl mt-4 font-bold mb-4">Table of Contents</h3>
            <DocsTableOfContents items={tablePosts.map(({ title, anchorId }) => ({ title, anchorId }))}/>
            <hr className="border-gray-600/75 border-t mt-2"></hr>
          </section>
        </>
      }
      <div className={styles.section}>
        {tablePosts.map(({ name, anchorId, Component }, i) => (
          <section key={`section-${i}`} id={anchorId} className={`anchor-target ${styles.card ?? ''}`}>
            {styles.date && <h4 className={styles.date}>{name}</h4>}
            <Component/>
          </section>
        ))}
      </div>
    </article>
  )
}