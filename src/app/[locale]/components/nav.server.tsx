import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/i18n";
import Nav, { type NavProps } from "./nav.client";

interface NavWrapperProps extends Omit<NavProps, "messages"> {
  locale: Locale;
}

// This is a wrapper component that is used to pass props from the server to the client (must be serializable!).
// https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization

export default async function NavWrapper({ locale, pages }: NavWrapperProps) {
  const intl = await getIntl(locale);
  const messages = {
    home: intl.formatMessage({
      id: "nav.home",
      defaultMessage: "Home",
      description: "Home",
    }),
  };
  return <Nav pages={pages} locale={locale} messages={messages} />;
}
