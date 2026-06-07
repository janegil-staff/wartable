// src/i18n/langMeta.js — display metadata for each supported language.
export const LANG_META = {
  en: { flag: "🇬🇧", native: "English", english: "English" },
  no: { flag: "🇳🇴", native: "Norsk", english: "Norwegian" },
  de: { flag: "🇩🇪", native: "Deutsch", english: "German" },
  da: { flag: "🇩🇰", native: "Dansk", english: "Danish" },
  sv: { flag: "🇸🇪", native: "Svenska", english: "Swedish" },
  fi: { flag: "🇫🇮", native: "Suomi", english: "Finnish" },
  fr: { flag: "🇫🇷", native: "Français", english: "French" },
  es: { flag: "🇪🇸", native: "Español", english: "Spanish" },
  it: { flag: "🇮🇹", native: "Italiano", english: "Italian" },
  nl: { flag: "🇳🇱", native: "Nederlands", english: "Dutch" },
  pl: { flag: "🇵🇱", native: "Polski", english: "Polish" },
  pt: { flag: "🇵🇹", native: "Português", english: "Portuguese" },
};
// order to display (English & Norsk first, matching the screenshot vibe)
export const LANG_ORDER = ["en", "no", "de", "da", "sv", "fi", "fr", "es", "it", "nl", "pl", "pt"];
