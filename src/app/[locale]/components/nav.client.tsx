"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Page } from "@/lib/helpers";
import { removeDefaultLocale, type Locale } from "@/lib/i18n";
import styles from "./nav.module.css";

export interface NavProps {
  pages: Page[];
  locale: Locale;
  messages: Record<string, string>;
}

export default function Nav({ pages, locale, messages }: NavProps) {
  const pathname = usePathname();
  const homeHref = removeDefaultLocale(`/${locale}`);
  const isHome = pathname === homeHref;
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li key="home">
          <Link
            href={removeDefaultLocale(`/${locale}`)}
            className={isHome ? `active` : undefined}
          >
            {messages.home}
          </Link>
        </li>

        {pages.map((page) => {
          const href = removeDefaultLocale(
            `/${page.locale}/${page.uid.join("/")}`
          );
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link href={href} className={isActive ? `active` : undefined}>
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
