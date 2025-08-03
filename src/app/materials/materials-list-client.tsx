"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import type { PostMetadata } from "@/lib/markdown";
import { slugify } from "@/lib/utils/utils";

interface BlogListClientProps {
  allBlogPosts: PostMetadata[];
  uniqueCategories: { name: string; slug: string }[];
  uniqueYears: string[];
}

export default function BlogListClient({
  allBlogPosts,
  uniqueCategories,
  uniqueYears,
}: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(allBlogPosts);

  // пошук лише по h1
  // useEffect(() => {
  //   const trimmedSearchTerm = searchTerm.toLowerCase().trim(); // ВИПРАВЛЕНО: Додано .trim()

  //   if (trimmedSearchTerm === "") {
  //     // Перевіряємо обрізаний термін
  //     setFilteredPosts(allBlogPosts);
  //   } else {
  //     const newFilteredPosts = allBlogPosts.filter((post) => {
  //       const matches =
  //         post.h1 && post.h1.toLowerCase().includes(trimmedSearchTerm); // ВИПРАВЛЕНО: Використовуємо обрізаний термін
  //       return matches;
  //     });
  //     setFilteredPosts(newFilteredPosts);
  //   }
  // }, [searchTerm, allBlogPosts]);
  useEffect(() => {
    console.log("All Blog Posts:", allBlogPosts);
    console.log("Current Search Term (raw):", searchTerm); // Лог сирого терміну
    const trimmedSearchTerm = searchTerm.toLowerCase().trim(); // ВИПРАВЛЕНО: Додано .trim()
    console.log("Current Search Term (trimmed):", trimmedSearchTerm); // Лог обрізаного терміну

    if (trimmedSearchTerm === "") {
      // Перевіряємо обрізаний термін
      setFilteredPosts(allBlogPosts);
    } else {
      const newFilteredPosts = allBlogPosts.filter((post) => {
        const matches =
          (post.title &&
            post.title.toLowerCase().includes(trimmedSearchTerm)) ||
          (post.preview &&
            post.preview.toLowerCase().includes(trimmedSearchTerm)); // ОНОВЛЕНО: Перевірка як у заголовку, так і у попередньому перегляді
        console.log(
          `Post: ${post.title}, Title: ${post.title}, Preview: ${post.preview}, Matches: ${matches}`
        );
        return matches;
      });
      setFilteredPosts(newFilteredPosts);
      console.log("Filtered Posts:", newFilteredPosts);
    }
  }, [searchTerm, allBlogPosts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
        Наш Блог
      </h1>

      {/* Поле пошуку */}
      <div className="mb-8 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Пошук за заголовком статті..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Навігація за категоріями та роками */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Категорії</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/materials/category/${category.slug}`}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Роки</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueYears.map((year) => (
              <Link
                key={year}
                href={`/materials/year/${year}`}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                {year}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {post.pictureMain && (
                <Image
                  src={post.pictureMain || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
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
                    {post.h1}
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
                  |{" "}
                  <Link
                    href={`/materials/category/${slugify(post.category)}`}
                    className="hover:underline"
                  >
                    {post.category}
                  </Link>
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            Не знайдено статей за вашим запитом.
          </p>
        )}
      </div>
    </div>
  );
}
