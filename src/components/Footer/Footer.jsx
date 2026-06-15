import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../NavBar/LanguageSwitcher";
import "./Footer.css";

const Footer = memo(() => {
	const { t } = useTranslation();
	return (
		<footer className="footer">
			<div className="footer-container">
				{/* ==================== Brand Section ==================== */}
				<div className="footer-brand">
					<h2>{t("footer_brand")}</h2>
					<p>{t("footer_tagline")}</p>
				</div>

				{/* ==================== Navigation Links ==================== */}
				<ul className="footer-links" aria-label={t("home")}>
					<li>
                        <NavLink to="/" aria-label={t("home")}>{t("home")}</NavLink>
					</li>
					<li>
                        <NavLink to="/movies" aria-label={t("movies")}>{t("movies")}</NavLink>
					</li>
					<li>
					<NavLink to="/about-us" aria-label={t("about_us")}>{t("about_us")}</NavLink>
					</li>
					<li>
					<a href="https://ahmedmaher-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" title={t("footer_contact")}>{t("footer_contact")}</a>
					</li>
				</ul>

				{/* ==================== Language Switcher ==================== */}
				<div className="footer-lang">
					<LanguageSwitcher />
				</div>

				{/* ==================== Social Media Links ==================== */}
				<div className="footer-social">
                    <a href="https://www.linkedin.com/in/ahmed-maher-algohary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="Go To LinkedIn">
						<i className="fa-brands fa-linkedin"></i>
					</a>
					<a href="https://ahmedmaher-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio" title="Go To Ahmed Maher's Portfolio">
						<i className="fa-solid fa-briefcase"></i>
					</a>
					<a href="https://web.facebook.com/profile.php?id=100012154268952" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Go To Facebook">
						<i className="fa-brands fa-facebook"></i>
					</a>
					<a href="https://github.com/Ahmed-Maher77" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="Go To GitHub">
						<i className="fa-brands fa-github"></i>
					</a>
				</div>
			</div>

			{/* ==================== Copyright ==================== */}
			<div className="footer-bottom">
				<p>
					{t("copyright")} &copy; {new Date().getFullYear()} &nbsp;| &nbsp;
                    <a href="https://ahmedmaher-portfolio.vercel.app/" className="main-color fw-bold fs-6 text-decoration-none" target="_blank" title="Go To Ahmed Maher's Portfolio"rel="noopener noreferrer" aria-label={t("footer_contact")}>Ahmed Maher</a>
				</p>
			</div>
			</footer>
	);
});

// Add a display name to prevent ESLint warning
Footer.displayName = "Footer";

export default Footer;

