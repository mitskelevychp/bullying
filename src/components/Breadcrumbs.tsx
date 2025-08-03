import { BreadcrumbsClient } from "./BreadcrumbsClient";
import { getAllCategoryStrings } from "@/lib/markdown";

export async function Breadcrumbs() {
  const allCategories = getAllCategoryStrings();

  return <BreadcrumbsClient allCategories={allCategories} />;
}
