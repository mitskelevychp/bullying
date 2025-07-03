import type { Metadata } from "next";

export const metadata: Metadata = {
  authors: [
    {
      // TODO:
      name: "ForBiz UA (Sole Proprietor: Pavlo Mitskelevych)",
      // TODO:
      url: "https://forbiz.website",
    },
  ],
  // TODO:
  creator: "ForBiz UA (Sole Proprietor: Pavlo Mitskelevych)",
  // TODO:
  publisher: "ForBiz UA (Sole Proprietor: Pavlo Mitskelevych)",
  openGraph: {
    // TODO:
    siteName: "ForBiz UA",
    images: [
      {
        // TODO:
        url: "https://forbiz.website/images/logo-og.jpeg",
        // TODO:
        secureUrl: "https://forbiz.website/images/logo-og.jpeg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        // TODO:
        alt: "ForBiz UA: створення сайтів для бізнесу",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // TODO:
    images: ["https://forbiz.website/images/logo-og.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-og-apple.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO:
  // verification: {
  //   google: "OcuQWbcrB580uLRkyi5KIfn2QEo1B9rDLAdtXudK3Hc",
  // },
};
