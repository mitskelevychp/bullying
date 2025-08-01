// import { MainBlock } from "@/components";
// import { BlogBlock } from "./BlogBlock";

// export async function MainPage() {
//   return (
//     <>
//       <MainBlock />
//       <BlogBlock />
//     </>
//   );
// }
import { MainBlock } from "@/components";
import { BlogBlock } from "./BlogBlock";
import { getArticlesFromSheet } from "@/lib/sheets";

export async function MainPage() {
  // Отримуємо статті тут (на серверному рівні)
  const articles = await getArticlesFromSheet();

  // Беремо тільки 3 останні статті
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <MainBlock />
      <BlogBlock articles={latestArticles} />
    </>
  );
}
