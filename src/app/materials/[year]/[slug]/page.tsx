import {
  getPostData,
  getAllPostSlugsWithYear,
  type Post,
} from "@/lib/markdown";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { year: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params;
  const post = await getPostData(year, slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://yourdomain.com/materials/${post.year}/${post.slug}`,
      images: [post.pictureMain],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Генерація статичних шляхів для всіх статей
export async function generateStaticParams() {
  const slugsWithYear = getAllPostSlugsWithYear();
  return slugsWithYear;
}

// Компонент сторінки статті
export default async function PostPage({ params }: Props) {
  const { year, slug } = await params; // Очікуємо params та деструктуруємо year і slug

  // Динамічний імпорт MDX файлу
  const MDXContent = await import(`@/content/posts/${slug}.mdx`).catch(() =>
    notFound()
  );

  // getPostData все ще потрібен для отримання метаданих (frontmatter)
  const post: Post = await getPostData(year, slug);

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          {post.h1}
        </h1>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("uk-UA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>{" "}
          | Категорія: {post.category} | Автор: {post.author}
        </div>
        {post.pictureMain && (
          <Image
            src={post.pictureMain || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-auto rounded-lg object-cover mx-auto"
            priority
          />
        )}
      </header>

      {/* Рендеринг MDX контенту */}
      <section className="prose prose-lg dark:prose-invert max-w-none">
        <MDXContent.default />
      </section>

      {post.resume && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Висновок</h2>
          <p className="text-gray-700 dark:text-gray-300">{post.resume}</p>
        </div>
      )}
    </article>
  );
}
