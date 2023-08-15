"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { type Locale } from "@/lib/i18n";
import { useLocaleLinks } from "@/lib/hooks";
import styles from "./locale-switch.module.css";

interface LocaleSwitchProps {
  locale: Locale;
  locales: Locale[];
  includeCurrentLocale?: boolean;
}

export default function LocaleSwitch({
  locale,
  locales,
  includeCurrentLocale,
}: LocaleSwitchProps) {
  const pathname = usePathname();
  const links = useLocaleLinks({ locale, locales, includeCurrentLocale });
  return (
    <nav>
      <ul className={styles.list}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={false}
                className={clsx(styles.link, isActive && `active`)}
              >
                {link.hreflang.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
