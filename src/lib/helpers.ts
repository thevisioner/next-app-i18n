import "server-only";

import type { Locale } from "@/lib/i18n";
import { pages } from "@/data/settings";

export type Page = {
  uid: string[];
  locale: Locale;
  title: string;
  alternate_languages?: {
    uid: string[];
    locale: Locale;
  }[];
};

export function getPagesInLocale(pages: Page[], locale: Locale) {
  return pages.filter((page) => page.locale === locale);
}

export function getPageByUid(pages: Page[], uid: string[]) {
  return pages.filter((page) => page.uid.join("/") === uid.join("/"))[0];
}

export async function getPages(): Promise<Page[]> {
  // const res = await fetch(`http://localhost:3000/api/settings`, {
  //   cache: "no-cache",
  // });
  // const data = await res.json();
  // return data.pages;

  return pages as Page[];
}
