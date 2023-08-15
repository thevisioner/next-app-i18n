import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Locale,
  AlternateLink,
  getAlternateLinksFromDocument,
  removeDefaultLocale,
} from "./i18n";

function useGetAlternateLinks() {
  const pathname = usePathname();
  // Replace root language path with translated document path if available
  // e.g. /en/ -> /en/about/company/ if /about/company/ is available in English
  const [alternateLinks, setAlternateLinks] = useState<AlternateLink[] | null>(
    null
  );
  useEffect(() => {
    const alternateLinks = getAlternateLinksFromDocument(document);
    if (alternateLinks.length > 0) {
      const links = alternateLinks.map((link) => ({
        hreflang: link.hreflang,
        href: removeDefaultLocale(link.href),
      }));
      setAlternateLinks(links);
    } else {
      setAlternateLinks(null);
    }
  }, [pathname]);
  return alternateLinks;
}

function useGetLocaleLinks({
  locale,
  locales,
  includeCurrentLocale,
}: {
  locale: Locale;
  locales: Locale[];
  includeCurrentLocale?: boolean;
}) {
  const links = useMemo(() => {
    const allLocales = includeCurrentLocale
      ? locales
      : locales.filter((l) => l !== locale);
    const links = allLocales.map<AlternateLink>((locale) => ({
      hreflang: locale,
      href: `/${locale}`,
    }));
    return links;
  }, [includeCurrentLocale, locale, locales]);
  return links;
}

// Merge functionality of useAlternateLinks and useListLocales into one hook
export function useLocaleLinks({
  locale,
  locales,
  includeCurrentLocale,
}: {
  locale: Locale;
  locales: Locale[];
  includeCurrentLocale?: boolean;
}) {
  const alternateLinks = useGetAlternateLinks();
  const localeLinks = useGetLocaleLinks({
    locale,
    locales,
    includeCurrentLocale,
  });
  const links = localeLinks.map((link) => {
    const alternateLink = alternateLinks?.find(
      (alternateLink) => alternateLink.hreflang === link.hreflang
    );
    return {
      hreflang: link.hreflang,
      href: removeDefaultLocale(alternateLink?.href ?? link.href),
    };
  });
  return links;
}
