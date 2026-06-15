import Profile_Dropdown from "./Profile_Dropdown/Profile_Dropdown";
import { useSelector } from "react-redux";
import ContactUs_Link from "./ContactUs_Link";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import NavLinkItem from "./NavLinkItem";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const NavLinks = ({ closeMenu }) => {
	const { t, i18n } = useTranslation();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const handleLogin = useGoogleLogin();
	const navAlign = i18n.language === "ar" ? "me-auto" : "ms-auto";

	return (
		<ul className={`navbar-nav ${navAlign} mb-2 mb-lg-0 pe-1`}>
			<NavLinkItem to="/" onClick={closeMenu}>
				{t("home")}
			</NavLinkItem>
			<NavLinkItem to="/movies" onClick={closeMenu}>
				{t("movies")}
			</NavLinkItem>
			<NavLinkItem to="/tv-series" onClick={closeMenu}>
				{t("tv_series")}
			</NavLinkItem>
			<NavLinkItem to="/watchlist" onClick={closeMenu}>
				{t("watchlist")}
			</NavLinkItem>
			<ContactUs_Link closeMenu={closeMenu} />
			<li className="nav-item d-flex align-items-center">
				<LanguageSwitcher />
			</li>
			{isAuth ? (
				<li className="nav-item">
					<Profile_Dropdown />
				</li>
			) : (
				<LoginButton
					onClick={() => {
						closeMenu();
						handleLogin();
					}}
				/>
			)}
		</ul>
	);
};

import PropTypes from "prop-types";
NavLinks.propTypes = {
	closeMenu: PropTypes.func.isRequired,
};

export default NavLinks;
