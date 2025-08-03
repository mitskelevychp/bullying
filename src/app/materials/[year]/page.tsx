import Link from "next/link";
import { getAllYearStrings } from "@/lib/markdown";
import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Усі роки публікацій",
  description: "Перелік усіх років, за які доступні статті у нашому блозі.",
};

export default function AllYearsPage() {
  const years = getAllYearStrings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
        Усі роки публікацій
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {years.length > 0 ? (
          years.map((year) => (
            <Card
              key={year}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link
                    href={`/materials/year/${year}`}
                    className="hover:underline"
                  >
                    {year} рік
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Переглянути статті за {year} рік.
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            Років публікацій не знайдено.
          </p>
        )}
      </div>
    </div>
  );
}
