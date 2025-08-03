import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getPostsByCategory,
  getAllCategoriesForStaticParams,
  getAllCategoryStrings,
  type PostMetadata,
} from "@/lib/markdown"; // Оновлено імпорт
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { "category-slug": string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categorySlug = params["category-slug"];
  const allCategories = getAllCategoryStrings(); // Отримуємо всі категорії з назвами та slug
  const originalCategoryName =
    allCategories.find((cat) => cat.slug === categorySlug)?.name ||
    categorySlug; // Знаходимо оригінальну назву

  return {
    title: `Статті в категорії: ${originalCategoryName}`,
    description: `Перелік усіх статей у категорії "${originalCategoryName}".`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategoriesForStaticParams();
  return categories;
}

export default async function CategoryPage({ params }: Props) {
  const categorySlug = params["category-slug"];
  const posts: PostMetadata[] = getPostsByCategory(categorySlug);

  const allCategories = getAllCategoryStrings(); // Отримуємо всі категорії з назвами та slug
  const originalCategoryName =
    allCategories.find((cat) => cat.slug === categorySlug)?.name ||
    categorySlug; // Знаходимо оригінальну назву

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
        Категорія: {originalCategoryName} {/* Відображаємо оригінальну назву */}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {post.pictureMain && (
              <Image
                src={post.pictureMain || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={225}
                className="w-full h-48 object-cover rounded-t-lg"
                priority={false}
              />
            )}
            <CardHeader className="flex-grow">
              <CardTitle className="text-2xl leading-tight">
                <Link
                  href={`/materials/${post.year}/${post.slug}`}
                  className="hover:underline text-gray-900 dark:text-gray-50"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("uk-UA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>{" "}
                | {post.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-700 dark:text-gray-300 text-base">
                {post.preview}
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link
                href={`/materials/${post.year}/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:underline font-semibold"
              >
                Читати далі
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
