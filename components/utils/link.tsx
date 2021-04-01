import { ReactNode } from "react";
import { default as NextLink } from "next/link";

interface LinkProps {
  href: string;
  children: ReactNode;
}
export function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href}>
      <a className="text-blue-500 hover:text-blue-400">{children}</a>
    </NextLink>
  );
}

export function ExternalLink({ href, children }: LinkProps) {
  console.log("href", href);
  return (
    <a href={href} target="_blank" className="text-blue-500 hover:text-blue-400">
      {children}
    </a>
  );
}
