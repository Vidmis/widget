import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import useTranslationEn from "../public/locales/en/translation.json";
import useTranslationLt from "../public/locales/lt/translation.json";

const resources = {
  en: {
    translation: useTranslationEn,
  },
  lt: {
    translation: useTranslationLt,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmltag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    debug: true,
  });

export default i18n;
