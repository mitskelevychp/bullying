import {
  getAllPostsMetadata,
  getAllCategoryStrings,
  getAllYearStrings,
} from "@/lib/markdown";
import BlogListClient from "./materials-list-client";

export default function Page() {
  const allBlogPosts = getAllPostsMetadata();
  const uniqueCategories = getAllCategoryStrings();
  const uniqueYears = getAllYearStrings();

  return (
    <BlogListClient
      allBlogPosts={allBlogPosts}
      uniqueCategories={uniqueCategories}
      uniqueYears={uniqueYears}
    />
  );
}
