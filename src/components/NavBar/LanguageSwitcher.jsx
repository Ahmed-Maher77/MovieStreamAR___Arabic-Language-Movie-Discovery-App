import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const switchLang = (lang) => {
		i18n.changeLanguage(lang);
		setOpen(false);
	};

	const currentFlag = i18n.language === "ar" ? "🇸🇦" : "🇺🇸";

	return (
		<div className="language-switcher-wrapper ms-2" ref={ref}>
			<button
				onClick={() => setOpen(!open)}
				className="language-switcher-btn py-2"
				aria-label={i18n.language === "ar" ? "Change language" : "تغيير اللغة"}
			>
				<i className="fa-solid fa-globe"></i>
				<span className="lang-flag-current">{currentFlag}</span>
				<i className={`fa-solid fa-chevron-${open ? "up" : "down"} lang-arrow`}></i>
			</button>

			{open && (
				<div className="language-dropdown">
					<button
						className={`language-option ${i18n.language === "ar" ? "active" : ""}`}
						onClick={() => switchLang("ar")}
					>
						<span className="lang-flag">🇸🇦</span> عربي
					</button>
					<button
						className={`language-option ${i18n.language === "en" ? "active" : ""}`}
						onClick={() => switchLang("en")}
					>
						<span className="lang-flag">🇺🇸</span> English
					</button>
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
