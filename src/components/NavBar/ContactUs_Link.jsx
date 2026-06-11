import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

const ContactUs_Link = ({ closeMenu }) => {
	return (
		<li className="nav-item ms-lg-1">
			<NavLink
				className="nav-link fs-5 px-3"
				to="/about-us"
				onClick={closeMenu}
			>
				نبذة وتواصل
			</NavLink>
		</li>
	);
};

ContactUs_Link.propTypes = {
	closeMenu: PropTypes.func.isRequired,
};

export default ContactUs_Link;
