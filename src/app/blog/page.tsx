// import Link from "next/link";
// import { getArticlesFromSheet } from "@/lib/sheets";

// export default async function BlogIndexPage() {
//   const articles = await getArticlesFromSheet();

//   return (
//     <main className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8">Блог</h1>

//       <ul className="space-y-4">
//         {articles.map((article) => (
//           <li key={article.slug} className="border-b pb-4">
//             <Link
//               href={`/blog/${article.slug}`}
//               className="text-blue-600 hover:underline"
//             >
//               <h2 className="text-xl font-semibold">{article.title}</h2>
//             </Link>
//             <p className="text-gray-600">{article.description}</p>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
import { getArticlesFromSheet } from "@/lib/sheets";
import BlogList from "@/components/BlogList";

export default async function BlogIndexPage() {
  const articles = await getArticlesFromSheet();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Блог</h1>
      <BlogList articles={articles} />
    </main>
  );
}
