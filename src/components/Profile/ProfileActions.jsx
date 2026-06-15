import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ProfileActions = ({ onEdit, onChangePassword, onLogout }) => {
	const { t } = useTranslation();
	return (
		<div className="profile-actions d-flex flex-column gap-3 justify-content-center mt-3">
			<div className="d-flex flex-column flex-md-row gap-3 justify-content-between mt-3">
				<button
					className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow-sm rounded-pill"
					onClick={onEdit}
					title={t("edit_profile")}
				>
					<i className="bi bi-pencil-square"></i>
					{t("edit_profile")}
				</button>
				<button
					className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow-sm rounded-pill"
					onClick={onChangePassword}
					title={t("change_password")}
				>
					<i className="bi bi-key"></i>
					{t("change_password")}
				</button>
			</div>
			<button
				className="btn btn-danger d-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow-sm rounded-pill"
				onClick={onLogout}
				title={t("logout")}
			>
				<i className="bi bi-box-arrow-right"></i>
				{t("logout")}
			</button>
		</div>
	);
};

ProfileActions.propTypes = {
	onEdit: PropTypes.func.isRequired,
	onChangePassword: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
};

export default ProfileActions;
