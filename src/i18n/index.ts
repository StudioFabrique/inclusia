import fr from "./locales/fr.json";
import es from "./locales/es.json";

export const locales = ["fr", "es"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof fr;
export const defaultLocale: Locale = "fr";
const dictionaries: Record<Locale, Messages> = { fr, es };
export function getLocale(value: string | undefined): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}
export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
