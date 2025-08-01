import { getArticlesFromSheet } from "@/lib/sheets";
import BlogList from "@/components/BlogList";

export default async function BlogIndexPage() {
  const articles = await getArticlesFromSheet();

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Блог</h1>
      <BlogList articles={articles} />
    </>
  );
}
