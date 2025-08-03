"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PostMetadata } from "@/lib/markdown";
import { slugify } from "@/lib/utils/utils";

interface MainPageClientProps {
  generalPosts: PostMetadata[];
  nonGeneralPosts: PostMetadata[];
  otherPosts: PostMetadata[];
}

export function MainPageClient({
  generalPosts,
  nonGeneralPosts,
  otherPosts,
}: MainPageClientProps) {
  const renderPostCards = (posts: PostMetadata[]) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.map((post) => (
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
          Статей не знайдено.
        </p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Блок 1: Статті категорії "Загальне" */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">
          Останні статті з категорії &quot;Загальне&quot;
        </h2>
        {renderPostCards(generalPosts)}
        {generalPosts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/materials/category/zahalne"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Переглянути всі статті категорії &quot;Загальне&quot;
            </Link>
          </div>
        )}
      </section>

      {/* Блок 2: Статті категорії "Не загальне" */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">
          Останні статті з категорії &quot;Не загальне&quot;
        </h2>
        {renderPostCards(nonGeneralPosts)}
        {nonGeneralPosts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/materials/category/ne-zahalne"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Переглянути всі статті категорії &quot;Не загальне&quot;
            </Link>
          </div>
        )}
      </section>

      {/* Блок 3: Статті категорії "Інше" */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">
          Останні статті з категорії &quot;Інше&quot;
        </h2>
        {renderPostCards(otherPosts)}
        {otherPosts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/materials/category/inше"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Переглянути всі статті категорії &quot;Інше&quot;
            </Link>
          </div>
        )}
      </section>

      {/* Якщо вам потрібен блок "Інші цікаві статті" (всі, крім перерахованих вище),
          тоді потрібно буде додати ще один пропс до MainPageClient
          і передати туди результат getPostsExcludingCategory з масивом slug-ів,
          або просто getAllPostsMetadata і фільтрувати на клієнті.
          Наразі цей блок закоментований, оскільки ми зосередилися на конкретних категоріях.
      */}
      {/*
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">Інші цікаві статті</h2>
        {renderPostCards(otherPosts)}
        {otherPosts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/materials"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Переглянути всі статті блогу
            </Link>
          </div>
        )}
      </section>
      */}
    </div>
  );
}
