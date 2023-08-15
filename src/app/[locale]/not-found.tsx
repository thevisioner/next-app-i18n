import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";
import styles from "./not-found.module.css";
import { getIntl } from "@/lib/intl";

// FIXME: Issue with not-found applying locale layout
// https://github.com/vercel/next.js/discussions/50034

// TODO: How to apply localization to 404 page?

export default async function NotFound() {
  const intl = await getIntl(defaultLocale);
  return (
    <div>
      <h1>
        {intl.formatMessage({
          id: "not-found.title",
          defaultMessage: "Page Not Found",
          description: "Not found page title",
        })}
      </h1>
      <p>
        {intl.formatMessage({
          id: "not-found.text",
          defaultMessage: "The page you requested could not be found.",
          description: "Not found page text",
        })}
      </p>
      <Link href="/" className={styles["back-link"]}>
        <span>❮</span>
        {intl.formatMessage({
          id: "not-found.return-home",
          defaultMessage: "Return to home page",
          description: "Not found page return home link",
        })}
      </Link>
    </div>
  );
}
