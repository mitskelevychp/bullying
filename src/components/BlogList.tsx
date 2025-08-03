"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Article = {
  title: string;
  description: string;
  slug: string;
};

export default function BlogList({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (slug: string) => {
    startTransition(() => {
      router.push(`/materials/${slug}`);
    });
  };

  return (
    <ul className="space-y-4">
      {isPending && <div>Завантаження...</div>}
      {!isPending &&
        articles.map((article) => (
          <li key={article.slug} className="border-b pb-4">
            <button
              onClick={() => handleClick(article.slug)}
              className="text-blue-600 hover:underline text-left"
              disabled={isPending}
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
            </button>
            <p className="text-gray-600">{article.description}</p>
          </li>
        ))}
    </ul>
  );
}
