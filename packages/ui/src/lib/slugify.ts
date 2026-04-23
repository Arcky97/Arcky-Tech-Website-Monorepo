export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace("é", "e")
    .replace(/[^\w\s-]/g,'')
    .trim()
    .replace(/\s+/g,'-')
}