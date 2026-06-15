import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";

const ContactUs_Link = ({ closeMenu }) => {
	const { t } = useTranslation();
	return (
		<li className="nav-item ms-lg-1">
			<NavLink
				className="nav-link fs-5 px-3"
				to="/about-us"
				onClick={closeMenu}
			>
				{t("contact_us_page")}
			</NavLink>
		</li>
	);
};

ContactUs_Link.propTypes = {
	closeMenu: PropTypes.func.isRequired,
};

export default ContactUs_Link;
