import { useTranslation } from "react-i18next";

const ErrorState = ({ error }) => {
	const { t } = useTranslation();
	return (
		<div className="container text-center py-5">
			<div className="alert alert-danger" role="alert">
				<i className="fas fa-exclamation-circle mx-2"></i>
				{t("error_watchlist")}: {error}
			</div>
		</div>
	);
};

export default ErrorState;
