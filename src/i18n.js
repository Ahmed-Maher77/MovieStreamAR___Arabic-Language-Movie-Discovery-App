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

const savedLanguage = localStorage.getItem("app_lang") || "ar";

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: savedLanguage, // default language
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

// Update document direction and lang attribute initially
document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
document.documentElement.lang = savedLanguage;

// Listen for language changes to update layout direction and save to localStorage
i18n.on("languageChanged", (lng) => {
	const dir = lng === "ar" ? "rtl" : "ltr";
	document.documentElement.dir = dir;
	document.documentElement.lang = lng;
	localStorage.setItem("app_lang", lng);
});

export default i18n;
