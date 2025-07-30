export const dynamic = "force-static";

import { getArticlesFromSheet } from "@/lib/sheets";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

type Article = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  text: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = (await getArticlesFromSheet()) as Article[];
  const article = articles.find((a) => a.slug === slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
  };
}

export async function generateStaticParams() {
  const articles = (await getArticlesFromSheet()) as Article[];
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = (await getArticlesFromSheet()) as Article[];
  const article = articles.find((a) => a.slug === slug);

  if (!article) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.h1}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.text }}
      />
    </main>
  );
}
