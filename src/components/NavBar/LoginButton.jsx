import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const LoginButton = ({ onClick }) => {
	const { t } = useTranslation();
	return (
		<li className="nav-item">
			<button
				className="login-btn d-flex align-items-center gap-2 fw-bold mt-4 mt-lg-0 justify-content-center w-100"
				onClick={onClick}
			>
				<img
					src="https://www.google.com/favicon.ico"
					alt="Google"
					width="20"
					height="20"
				/>
				{t("login")}
			</button>
		</li>
	);
};

LoginButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default LoginButton;
