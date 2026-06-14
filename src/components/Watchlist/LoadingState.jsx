import { useTranslation } from "react-i18next";

const LoadingState = () => {
	const { t } = useTranslation();
	return (
		<div className="container text-center py-5 page-height mt-5">
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">{t("loading_watchlist_alt")}</span>
			</div>
			<p className="mt-3">{t("loading_watchlist")}</p>
		</div>
	);
};

export default LoadingState;
