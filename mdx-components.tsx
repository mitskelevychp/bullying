import { InfoBox } from "@/components/InfoBox";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // h1: ({ children }) => <h1 style={{ color: 'blue' }}>{children}</h1>,
    InfoBox: InfoBox,
  };
}
