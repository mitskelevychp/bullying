import type { NextConfig } from "next";
import nextMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

// Ініціалізуємо плагін nextMDX
const withMDX = nextMDX({
  extension: /\.mdx?$/, // Вказуємо розширення для MDX файлів (.md та .mdx)
  options: {
    // Тут можна додати remark та rehype плагіни, якщо вони потрібні
    // Наприклад, remark-gfm для підтримки GitHub Flavored Markdown
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
    // Якщо ви використовуєте MDXProvider для глобального налаштування компонентів,
    // розкоментуйте наступний рядок:
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.forbiz.website" }],
        missing: [{ type: "header", key: "x-vercel-deployment-url" }],
        permanent: true,
        // TODO:
        destination: "https://forbiz.website/:path*",
      },
    ];
  },
  // ... інші ваші налаштування Next.js, якщо вони є
};

// Експортуємо обгорнуту конфігурацію Next.js за допомогою withMDX
// Це дозволяє Next.js обробляти MDX файли.
export default withMDX(nextConfig);
