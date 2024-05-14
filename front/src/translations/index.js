import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as frDic from 'translations/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: frDic.common,
        form: frDic.form,
        auth: frDic.auth,
        products: frDic.products
      }
    },
    supportedLngs: ['fr'],
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    defaultNS: 'common',
    ns: ['common', 'form', 'auth', 'products'],
    detection: {
      order: ['localStorage', 'navigator', 'path', 'cookie', 'subdomain', 'queryString', 'htmlTag']
    }
  });

export default i18n;
