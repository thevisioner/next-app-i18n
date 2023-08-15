import "server-only";

import { createIntl, createIntlCache } from "@formatjs/intl";
import { defaultLocale, type Locale } from "@/lib/i18n";

const importDictionary = (locale: Locale) => {
  return import(`../dictionaries/compiled/${locale}.json`)
    .then((module) => module.default)
    .catch(() => {});
};

const dictionaries = {
  en: () => importDictionary("en"),
  nl: () => importDictionary("nl"),
};

// Global (across locales) cache
const cache = createIntlCache();

export async function getIntl(locale: Locale) {
  const messages = (await dictionaries[locale]?.()) ?? {};
  const intl = createIntl(
    {
      locale,
      defaultLocale,
      messages,
      onError: (error) => {
        if (error.code === "MISSING_TRANSLATION") {
          console.warn(error);
          return;
        }
        throw error;
      },
    },
    cache
  );
  return intl;
}
