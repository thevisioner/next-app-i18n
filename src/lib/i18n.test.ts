import {
  isLocale,
  getLocaleFromPathname,
  isPathnameMissingLocale,
  removeDefaultLocale,
  getAlternateLinksFromDocument,
  removeHostname,
} from "@/lib/i18n";

describe("i18n", () => {
  describe("isLocale", () => {
    it("should return true for valid locales", () => {
      expect(isLocale("en")).toBe(true);
      expect(isLocale("nl")).toBe(true);
    });

    it("should return false for invalid locales", () => {
      expect(isLocale("foo")).toBe(false);
      expect(isLocale("bar")).toBe(false);
    });
  });

  describe("getLocaleFromPathname", () => {
    it("should return the locale from the pathname if it is a valid locale", () => {
      expect(getLocaleFromPathname("/en/products/123")).toBe("en");
      expect(getLocaleFromPathname("/nl/about-us/team")).toBe("nl");
    });

    it("should return the default locale if the pathname does not contain a valid locale", () => {
      expect(getLocaleFromPathname("/products/123")).toBe("en");
      expect(getLocaleFromPathname("/about-us/team")).toBe("en");
    });
  });

  describe("isPathnameMissingLocale", () => {
    it("should return true if the pathname is missing a locale", () => {
      expect(isPathnameMissingLocale("/products/123")).toBe(true);
      expect(isPathnameMissingLocale("/about-us/team")).toBe(true);
    });

    it("should return false if the pathname contains a locale", () => {
      expect(isPathnameMissingLocale("/en/products/123")).toBe(false);
      expect(isPathnameMissingLocale("/nl/about-us/team")).toBe(false);
    });
  });

  describe("removeDefaultLocale", () => {
    it("should remove the default locale from the pathname", () => {
      expect(removeDefaultLocale("/en/products/123")).toBe("/products/123");
      expect(removeDefaultLocale("/nl/about-us/team")).toBe(
        "/nl/about-us/team"
      );
      expect(removeDefaultLocale("/products/123")).toBe("/products/123");
      expect(removeDefaultLocale("/about-us/team")).toBe("/about-us/team");
    });

    it("should return a safe pathname that starts with a forward slash", () => {
      expect(removeDefaultLocale("/en")).toBe("/");
      expect(removeDefaultLocale("")).toBe("/");
    });
  });

  describe("getAlternateLinksFromDocument", () => {
    it("should return an empty array if there are no alternate links in the document", () => {
      const document = new DOMParser().parseFromString(
        "<html><head></head><body></body></html>",
        "text/html"
      );
      const alternateLinks = getAlternateLinksFromDocument(document);
      expect(alternateLinks).toEqual([]);
    });

    it("should return an array of alternate links if there are alternate links in the document", () => {
      const document = new DOMParser().parseFromString(
        `
        <html>
          <head>
            <link rel="alternate" href="/en/products/123" hreflang="en" />
            <link rel="alternate" href="/nl/about-us/team" hreflang="nl" />
          </head>
          <body></body>
        </html>
      `,
        "text/html"
      );
      const alternateLinks = getAlternateLinksFromDocument(document);
      expect(alternateLinks).toEqual([
        { href: "/en/products/123", hreflang: "en" },
        { href: "/nl/about-us/team", hreflang: "nl" },
      ]);
    });

    it("should ignore alternate links without href or hreflang attributes", () => {
      const document = new DOMParser().parseFromString(
        `
        <html>
          <head>
            <link rel="alternate" href="/en/products/123" hreflang="en" />
            <link rel="alternate" hreflang="nl" />
            <link rel="alternate" href="/fr" />
          </head>
          <body></body>
        </html>
      `,
        "text/html"
      );
      const alternateLinks = getAlternateLinksFromDocument(document);
      expect(alternateLinks).toEqual([
        { href: "/en/products/123", hreflang: "en" },
      ]);
    });
  });

  describe("removeHostname", () => {
    it("should remove the hostname from a URL with a hostname", () => {
      const url = "https://www.example.com/en/products/123";
      const result = removeHostname(url);
      expect(result).toBe("/en/products/123");
    });

    it("should remove the hostname from a URL without a scheme", () => {
      const url = "//www.example.com/en/products/123";
      const result = removeHostname(url);
      expect(result).toBe("/en/products/123");
    });

    it("should return the original URL if it does not contain a hostname", () => {
      const url = "/en/products/123";
      const result = removeHostname(url);
      expect(result).toBe("/en/products/123");
    });

    it("should return an empty string if the input is an empty string", () => {
      const url = "";
      const result = removeHostname(url);
      expect(result).toBe("");
    });
  });
});
