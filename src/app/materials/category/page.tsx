import Link from "next/link";
import { getAllCategoryStrings } from "@/lib/markdown";
import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Усі категорії статей",
  description: "Перелік усіх доступних категорій статей у нашому блозі.",
};

export default function AllCategoriesPage() {
  const categories = getAllCategoryStrings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
        Усі категорії статей
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Card
              key={category.slug}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link
                    href={`/materials/category/${category.slug}`}
                    className="hover:underline"
                  >
                    {category.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Переглянути статті в категорії &quot;{category.name}&quot;.
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            Категорій не знайдено.
          </p>
        )}
      </div>
    </div>
  );
}
