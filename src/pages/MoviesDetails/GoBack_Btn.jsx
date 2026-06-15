import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GoBack_Btn = () => {
	const { t, i18n } = useTranslation();
	const isRTL = i18n.language === "ar";
	const navigate = useNavigate();
	return (
		<button
			type="button"
			className="GoBack_Btn btn btn-secondary d-flex align-items-center gap-3 justify-content-between fs-5 pt-2 w-fit my-3 mb-2 px-4"
			onClick={() => navigate(-1)}
		>
			{t("back")}
			<span className={`fa-solid mt-2 ${isRTL ? "fa-arrow-left" : "fa-arrow-right"}`}></span>
		</button>
	);
};

export default GoBack_Btn;
