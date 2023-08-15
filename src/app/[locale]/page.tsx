import { getIntl } from "@/lib/intl";
import { type Locale } from "@/lib/i18n";
import Counter from "./components/counter.client";

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const intl = await getIntl(params.locale);

  const counterMessages = {
    increment: intl.formatMessage({
      id: "counter.increment",
      defaultMessage: "Increment",
      description: "Increment the counter",
    }),
    decrement: intl.formatMessage({
      id: "counter.decrement",
      defaultMessage: "Decrement",
      description: "Decrement the counter",
    }),
  };

  return (
    <main>
      <h1>
        {intl.formatMessage(
          {
            id: "home.greeting",
            defaultMessage: "Hello {name}!",
            description: "Greeting to welcome the user",
          },
          {
            name: "World",
          }
        )}
      </h1>

      <p>
        {intl.formatMessage({
          id: "server-component.message",
          defaultMessage: "This message is rendered on the server",
          description: "Example message rendered on the server",
        })}
      </p>

      <hr />

      <Counter messages={counterMessages} />
    </main>
  );
}
