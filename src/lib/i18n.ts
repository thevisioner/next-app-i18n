import i18n from "@/root/i18n.config";

export type Locale = (typeof i18n)["locales"][number];

export const locales = i18n.locales;
export const defaultLocale = i18n.defaultLocale;
export const mutableLocales: Locale[] = [...i18n.locales];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isDefaultLocale(value: string) {
  return value === i18n.defaultLocale;
}

export function getLocaleFromPathname(pathname: string) {
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    return firstSegment;
  }
  return i18n.defaultLocale;
}

export function isPathnameMissingLocale(pathname: string) {
  return locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
}

export function removeDefaultLocale(pathname: string) {
  const newPathname = pathname.replace(`/${i18n.defaultLocale}`, "");
  const safePathname = newPathname === "" ? "/" : newPathname;
  return safePathname;
}

export type AlternateLink = {
  href: string;
  hreflang: Locale;
};

export function removeHostname(url: string) {
  return url.replace(/^(?:\/\/|[^/]+)*/, "");
}

export function getAlternateLinksFromDocument(
  document: Document
): AlternateLink[] {
  const links = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="alternate"][href][hreflang]'
  );
  const alternateLinks = Array.from(links).map<AlternateLink>((link) => ({
    href: removeHostname(link.href),
    hreflang: link.hreflang as Locale,
  }));
  return alternateLinks;
}
