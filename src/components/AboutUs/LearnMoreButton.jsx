import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const LearnMoreButton = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const page_direction = useSelector(
		(state) => state.window_properties.page_direction
	);
	const isRTL = page_direction === "rtl";

	return (
		<button
			onClick={() => navigate("/about-us")}
			className="btn btn-main animated-arrow-hover-container"
			style={{
				backgroundColor: "#bc6132",
				color: "#fff",
				border: "none",
				borderRadius: "25px",
				padding: "14px 40px 14px 35px",
				fontSize: "16px",
				cursor: "pointer",
				transition: "all 0.3s ease",
				width: "fit-content",
				margin: "0 auto",
			}}
		>
			{t("about_learn_more")}
			<i
				className={`fa-solid animated-arrow-hover ${
					isRTL ? "fa-arrow-left me-3" : "fa-arrow-right ms-3"
				}`}
			></i>
		</button>
	);
};

export default LearnMoreButton;
