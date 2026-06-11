import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

// Language resources
const resources = {
	en: {
		translation: enTranslation,
	},
	ar: {
		translation: arTranslation,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "en", // default language
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
