import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinkItem = ({ to, children, onClick, ...props }) => (
	<li className="nav-item">
		<NavLink
			className="nav-link fs-5"
			style={{ paddingInline: "0.8rem" }}
			to={to}
			onClick={onClick}
			{...props}
		>
			{children}
		</NavLink>
	</li>
);

NavLinkItem.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

export default NavLinkItem;
