// src/i18n/index.js — i18next setup, Norwegian default, device-language detect.
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import no from "./locales/no.json";
import en from "./locales/en.json";
import nl from "./locales/nl.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import sv from "./locales/sv.json";
import da from "./locales/da.json";
import fi from "./locales/fi.json";
import es from "./locales/es.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";

export const LANGS = ["no", "en", "nl", "fr", "de", "it", "sv", "da", "fi", "es", "pl", "pt"];
export const DEFAULT_LANG = "no";

const resources = {
  no: { translation: no }, en: { translation: en }, nl: { translation: nl },
  fr: { translation: fr }, de: { translation: de }, it: { translation: it },
  sv: { translation: sv }, da: { translation: da }, fi: { translation: fi },
  es: { translation: es }, pl: { translation: pl }, pt: { translation: pt },
};

const deviceLang = (() => {
  try {
    const code = getLocales()?.[0]?.languageCode;
    return LANGS.includes(code) ? code : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
})();

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLang,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
