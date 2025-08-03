import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify } from "./utils/utils";

export type Frontmatter = {
  title: string;
  description: string;
  h1: string;
  pictureMain: string;
  preview: string;
  category: string;
  tags: string[];
  published: boolean;
  date: string;
  author: string;
  resume?: string;
};

export type PostMetadata = Frontmatter & {
  slug: string;
  year: string;
};

export type Post = PostMetadata & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPostSlugsWithYear(): { year: string; slug: string }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const year = (data.date as string).split("-")[0];

      return {
        year: year,
        slug: slug,
      };
    });
  } catch (error) {
    console.error("Error reading posts directory:", error);
    throw error;
  }
}

export async function getPostData(year: string, slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    year,
    slug,
    ...(data as Frontmatter),
    content,
  };
}

export function getAllPostsMetadata(): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsMetadata = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);
      const year = (data.date as string).split("-")[0];

      return {
        slug,
        year,
        ...(data as Frontmatter),
      };
    });

    return allPostsMetadata.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error in getAllPostsMetadata:", error);
    throw error;
  }
}

/**
 * Returns metadata for all posts in a category, with an optional limit.
 * Used for the blog/category/[category-slug]/page.tsx page and main page.
 */
export function getPostsByCategory(
  categorySlug: string,
  limit?: number
): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    let allPostsMetadata = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data } = matter(fileContents);
        const year = (data.date as string).split("-")[0];

        return {
          year,
          slug,
          ...(data as Frontmatter),
        };
      })
      .filter(
        (post) => slugify(post.category) === categorySlug
      ) as PostMetadata[];

    allPostsMetadata = allPostsMetadata.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    return limit ? allPostsMetadata.slice(0, limit) : allPostsMetadata;
  } catch (error) {
    console.error("Error in getPostsByCategory:", error);
    return [];
  }
}

/**
 * Returns metadata for all posts excluding a specific category, with an optional limit.
 * Used for the main page.
 */
export function getPostsExcludingCategory(
  categorySlug: string,
  limit?: number
): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    let allPostsMetadata = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data } = matter(fileContents);
        const year = (data.date as string).split("-")[0];

        return {
          year,
          slug,
          ...(data as Frontmatter),
        };
      })
      .filter(
        (post) => slugify(post.category) !== categorySlug
      ) as PostMetadata[];

    allPostsMetadata = allPostsMetadata.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    return limit ? allPostsMetadata.slice(0, limit) : allPostsMetadata;
  } catch (error) {
    console.error("Error in getPostsExcludingCategory:", error);
    return [];
  }
}

export function getAllCategoriesForStaticParams(): {
  "category-slug": string;
}[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const categories = new Set<string>();

    fileNames.forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data && data.category) {
        categories.add(data.category);
      }
    });

    return Array.from(categories).map((category) => ({
      "category-slug": slugify(category),
    }));
  } catch (error) {
    console.error("Error in getAllCategoriesForStaticParams:", error);
    return [];
  }
}

export function getAllCategoryStrings(): { name: string; slug: string }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const categories = new Set<string>();

    fileNames.forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data && data.category) {
        categories.add(data.category);
      }
    });

    return Array.from(categories).map((category) => ({
      name: category,
      slug: slugify(category),
    }));
  } catch (error) {
    console.error("Error in getAllCategoryStrings:", error);
    return [];
  }
}

export function getPostsByYear(year: string): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsMetadata = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data } = matter(fileContents);
        const fileYear = (data.date as string).split("-")[0];

        return {
          year: fileYear,
          slug,
          ...(data as Frontmatter),
        };
      })
      .filter((post) => post.year === year) as PostMetadata[];

    return allPostsMetadata.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error in getPostsByYear:", error);
    return [];
  }
}

export function getAllYearsForStaticParams(): { year: string }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const years = new Set<string>();

    fileNames.forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data && data.date) {
        const year = (data.date as string).split("-")[0];
        years.add(year);
      }
    });

    return Array.from(years).map((year) => ({ year: year }));
  } catch (error) {
    console.error("Error in getAllYearsForStaticParams:", error);
    return [];
  }
}

export function getAllYearStrings(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const years = new Set<string>();

    fileNames.forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data && data.date) {
        const year = (data.date as string).split("-")[0];
        years.add(year);
      }
    });

    return Array.from(years);
  } catch (error) {
    console.error("Error in getAllYearStrings:", error);
    return [];
  }
}
