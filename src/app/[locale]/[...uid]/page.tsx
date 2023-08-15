import "server-only";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { getPageByUid, getPages } from "@/lib/helpers";
import styles from "./page.module.css";

interface PageProps {
  params: {
    locale: Locale;
    uid: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const pages = await getPages();
  const page = getPageByUid(pages, params.uid);
  if (!page) {
    return notFound();
  }

  return (
    <main>
      <h1>{page.title}</h1>
      <pre className={styles.output}>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </main>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pages = await getPages();
  const page = getPageByUid(pages, params.uid);
  if (!page) {
    return {};
  }

  // Should include all alternate languages, including the current page
  // https://developers.google.com/search/docs/specialty/international/localized-versions
  const alternates = [
    {
      locale: page.locale,
      uid: page.uid,
    },
  ].concat(page.alternate_languages || []);

  const languages = alternates.reduce(
    (acc, lang) => ({
      ...acc,
      [lang.locale]: `http://localhost:3000/${lang.locale}/${lang.uid.join(
        "/"
      )}`,
    }),
    {}
  );

  return {
    alternates: {
      languages,
    },
  };
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    locale: page.locale,
    uid: page.uid,
  }));
}
