import { Metadata } from "next";
import { metadata as defaultMetadata } from "./defaultMetadata";

type MetadataOptions = {
  title: string;
  description: string;
  pathname: string;
};

export function generateMetadata({
  title,
  description,
  pathname,
}: MetadataOptions): Metadata {
  // TODO:
  const url = `https://forbiz.website${pathname}`;

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
