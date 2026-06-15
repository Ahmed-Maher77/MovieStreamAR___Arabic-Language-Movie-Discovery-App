import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GoBack_Btn = () => {
	const { t, i18n } = useTranslation();
	const isRTL = i18n.language === "ar";
	return (
		<NavLink
			to={-1}
			type="button"
			className="GoBack_Btn btn btn-secondary d-flex align-items-center gap-3 justify-content-between fs-5 pt-2 w-fit my-3 mb-2 px-4"
		>
			{t("back")}
			<span className={`fa-solid mt-2 ${isRTL ? "fa-arrow-left" : "fa-arrow-right"}`}></span>
		</NavLink>
	);
};

export default GoBack_Btn;
