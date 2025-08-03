import type { Metadata } from "next";
import { generateMetadata } from "@/lib/utils/seo/generateMetadata";
import { SupportPage } from "@/components/pages/Support/SupportPage";

// TODO:
export const metadata: Metadata = generateMetadata({
  title: "ForBiz UA: розробка сайтів та SEO для бізнесу в Борисполі",
  description:
    "Прості інтернет-рішення для вашого бізнесу: створення сайтів, web-застосунків, SEO-просування. ForBiz UA — ваш технічний партнер у Борисполі",
  pathname: "/",
});

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Page() {
  return <SupportPage />;
}
