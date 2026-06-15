import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import "./Loader.css"

const MainLoader = () => {
	const { t } = useTranslation();
	return (
		<div className="MainLoader">
			<Loader title={t("loading")} />
		</div>
	);
};

export default MainLoader;
