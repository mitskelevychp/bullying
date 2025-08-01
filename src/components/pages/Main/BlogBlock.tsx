import Link from "next/link";
import "./mainBlock.css";

type Article = {
  title: string;
  description: string;
  slug: string;
};

interface BlogBlockProps {
  articles: Article[];
}

export function BlogBlock({ articles }: BlogBlockProps) {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Останні статті блогу</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 hover:underline">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm">{article.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Дивитися всі статті
          </Link>
        </div>
      </div>
    </div>
  );
}
