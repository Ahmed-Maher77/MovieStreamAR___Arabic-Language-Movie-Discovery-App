import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ToastWrapper = () => {
	const { i18n } = useTranslation();
	const pageDirection = useSelector(
		(state) => state.window_properties.page_direction
	) || (i18n.language === "ar" ? "rtl" : "ltr");
	return (
		<ToastContainer
			position="top-center"
			autoClose={2000}
			rtl={pageDirection === "rtl"}
			style={{ direction: pageDirection }}
		/>
	);
};

export default ToastWrapper;
