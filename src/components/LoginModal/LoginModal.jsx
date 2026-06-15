import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
	const { t } = useTranslation();
	if (!isOpen) return null;

	return (
		<div className="login-modal-overlay" onClick={onClose}>
			<div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="login-modal-header">
					<h3>{t("login_title")}</h3>
					<button className="close-btn" onClick={onClose} aria-label={t("back")}>
						<span className="fa-solid fa-xmark"></span>
					</button>
				</div>
				<div className="login-modal-body">
					<p>{t("login_description")}</p>
					<button className="login-btn" onClick={onLogin}>
						<img
							src="https://www.google.com/favicon.ico"
							alt="Google"
							width="20"
							height="20"
						/>
						{t("login_google")}
					</button>
				</div>
			</div>
		</div>
	);
};

LoginModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
