import type { Metadata } from "next";
import { generateMetadata } from "@/lib/utils/seo/generateMetadata";
import { AboutPage } from "@/components";

// TODO:
export const metadata: Metadata = generateMetadata({
  title: "Про ForBiz UA: як ми працюємо, цінності та партнери",
  description:
    "ForBiz UA: особливості роботи з замовленнями, наші пріоритети, досягнення. Отримати індивідуальну консультацію: +380506019021",
  pathname: "/about",
});

export default function Page() {
  return <AboutPage />;
}
