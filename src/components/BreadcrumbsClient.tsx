"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsClientProps {
  allCategories: { name: string; slug: string }[];
}

const staticLabels: { [key: string]: string } = {
  materials: "Матеріали",
  about: "Про нас",
  contacts: "Контакти",
  "privacy-policy": "Політика конфіденційності",
  "support-project": "Підтримка проєкту",
  "what-to-do": "Що робити",
};

export function BreadcrumbsClient({ allCategories }: BreadcrumbsClientProps) {
  const pathname = usePathname();
  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Головна", href: "/" }];
  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    let label =
      staticLabels[segment] ||
      segment.replace(/-/g, " ").charAt(0).toUpperCase() +
        segment.replace(/-/g, " ").slice(1);
    let href = currentPath;

    // Обробка динамічних сегментів та спеціальних маршрутів
    if (segment === "category" && i + 1 < segments.length) {
      // Додаємо проміжну мітку "Категорії"
      breadcrumbItems.push({ label: "Категорії", href: "/materials/category" });

      // Обробляємо фактичний slug категорії
      const categorySlug = segments[i + 1];
      const category = allCategories.find((cat) => cat.slug === categorySlug); // Використовуємо передані категорії

      label = category ? `Категорія: ${category.name}` : categorySlug;
      href = `/materials/category/${categorySlug}`;

      breadcrumbItems.push({ label, href });
      currentPath = href;
      i++; // Пропускаємо наступний сегмент (category-slug), оскільки він вже оброблений
      continue;
    } else if (
      segment === "year" &&
      i + 1 < segments.length &&
      segments[i - 1] === "materials"
    ) {
      // Додаємо проміжну мітку "Роки"
      breadcrumbItems.push({ label: "Роки", href: "/materials/year" });

      // Обробляємо фактичне значення року
      const year = segments[i + 1];
      label = `Рік: ${year}`;
      href = `/materials/year/${year}`;

      breadcrumbItems.push({ label, href });
      currentPath = href;
      i++; // Пропускаємо наступний сегмент (year), оскільки він вже оброблений
      continue;
    } else if (
      // Маршрут: /materials/[year]/[slug] (сторінка окремої статті)
      i > 0 && // Переконатися, що є попередній сегмент
      !isNaN(Number.parseInt(segments[i - 1])) && // Попередній сегмент є числом (роком)
      segments[i - 2] === "materials" && // Два сегменти тому був "materials"
      segments.length === i + 1 // Це останній сегмент у шляху (slug статті)
    ) {
      // Для отримання заголовка статті тут потрібен Server Component або API маршрут.
      // Оскільки ми в Client Component, ми не можемо викликати getPostData безпосередньо.
      // Для простоти, поки що будемо використовувати slug як мітку.
      // Якщо потрібен реальний заголовок, доведеться або передавати його з Server Component,
      // або робити fetch до API маршруту.
      label =
        segment.replace(/-/g, " ").charAt(0).toUpperCase() +
        segment.replace(/-/g, " ").slice(1);
    }

    // Додаємо елемент, якщо він ще не був доданий спеціальною логікою
    const isAlreadyAdded = breadcrumbItems.some((item) => item.href === href);
    if (!isAlreadyAdded) {
      breadcrumbItems.push({ label, href });
    }
  }

  // Не відображати хлібні крихти на головній сторінці
  if (breadcrumbItems.length === 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-md mx-auto max-w-7xl">
      {breadcrumbItems.map((item, index) => (
        <Fragment key={item.href}>
          <Link
            href={item.href}
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            {item.label}
          </Link>
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
