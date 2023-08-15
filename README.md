# Next.js i18n example

This is an example app that demonstrates how to use internationalization (i18n) in a Next.js app with App Router and Server Components.

## Getting Started

To get started, clone this repository and run the following commands:

```bash
npm install
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Internationalization (i18n)

This app uses the `react-intl` library for internationalization. The `@/lib/intl` provides a `getIntl()` function that loads the `react-intl` library and returns an `intl` object that provides the `defineMessage()` and `formatMessage()` functions.

### Configuration

To configure application locales, update the `i18n.config.ts` file. This file exports a `locales` array that contains the locales that are supported by the application. The `defaultLocale` property specifies the default locale for the application.

```typescript
// i18n.config.ts
const i18n = {
  defaultLocale: "en",
  locales: ["en", "nl"],
} as const;
```

Also update the `lib/intl.ts` file to reflect the locales that are supported by the application. The `dictionaries` object contains a function for each locale that loads the dictionary for that locale.

```typescript
// lib/intl.ts
const dictionaries = {
  en: () => importDictionary("en"),
  nl: () => importDictionary("nl"),
};
```

### Defining Messages

Messages are defined using the `intl.formatMessage` function from the `@/lib/intl` module. Here's an example of how to define a message:

```typescript
import { getIntl } from "@/lib/intl";

const intl = await getIntl("en");

const messages = {
  greeting: intl.formatMessage({
    id: "greeting",
    defaultMessage: "Hello, {name}!",
    description: "Greeting message",
  }),
};
```

In this example, the `intl.formatMessage` function is used to define a message with an ID of `"greeting"`, a default message of `"Hello, {name}!"`, and a description of `"Greeting message"`. The `{name}` placeholder will be replaced with the actual name when the message is formatted.

### Wrapping Client Components

Components can be wrapped with a server component to pass messages as props to client components. Here's an example of how to wrap the `Nav` component with a server component:

```typescript
import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/i18n";
import Nav, { type NavProps } from "./nav.client";

interface NavWrapperProps extends Omit<NavProps, "messages"> {
  locale: Locale;
}

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
```

### Extracting Messages

Messages can be extracted from components using the `npm run intl:extract` command. This command will extract messages from the components and write them to the `en.json` file in the `dictionaries` directory.

### Compiling Messages

For better performance, messages should be compiled to AST format using the `npm run intl:compile` command. This command will compile the messages in the `dictionaries` directory and write them to the `dictionaries/compiled` directory.

## License

This app is licensed under the MIT license. See the `LICENSE` file for more information.

I hope this helps! Let me know if you have any other questions or issues related to your TypeScript code.
