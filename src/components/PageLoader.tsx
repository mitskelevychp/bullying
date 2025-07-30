"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Article = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  text: string;
};

export function PageLoader({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (slug: string) => {
    startTransition(() => {
      router.push(`/blog/${slug}`);
    });
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Блог</h1>

      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-4">
            <button
              onClick={() => handleClick(article.slug)}
              className="text-blue-600 hover:underline text-left"
              disabled={isPending}
            >
              <h2 className="text-xl font-semibold">
                {isPending ? "Завантаження..." : article.title}
              </h2>
            </button>
            <p className="text-gray-600">{article.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
