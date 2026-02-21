const MD_FILES = import.meta.glob("./md/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getCaseStudyMarkdown(slug: string): string | null {
  return MD_FILES[`./md/${slug}.md`] ?? null;
}
