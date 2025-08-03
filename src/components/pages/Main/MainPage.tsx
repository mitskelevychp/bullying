import { getPostsByCategory } from "@/lib/markdown";
import { MainPageClient } from "@/components/MainPageClient";
import { slugify } from "@/lib/utils/utils";
import { MainBlock } from "@/components";

export async function MainPage() {
  const generalCategorySlug = slugify("Загальне");
  const nonGeneralCategorySlug = slugify("Не загальне");
  const otherCategorySlug = slugify("Інше");

  const generalPosts = getPostsByCategory(generalCategorySlug, 3);
  const nonGeneralPosts = getPostsByCategory(nonGeneralCategorySlug, 3);
  const otherPosts = getPostsByCategory(otherCategorySlug, 3);

  // Якщо вам потрібен блок "Інші цікаві статті" (тобто всі, крім "Загальне" та "Не загальне"),
  // ви можете додати ще один виклик getPostsExcludingCategory, передавши масив slug-ів
  // або просто getAllPostsMetadata і фільтрувати на клієнті, якщо це не критично для SSG.

  return (
    <>
      <MainBlock />
      <MainPageClient
        generalPosts={generalPosts}
        nonGeneralPosts={nonGeneralPosts}
        otherPosts={otherPosts}
      />
    </>
  );
}
