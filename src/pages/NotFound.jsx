import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<main className="text-center d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 65px)", background: "var(--body-bg)", minHeight: "100vh" }}>
			<div className="container py-5 bg-white rounded-4 p-5" style={{ maxWidth: "500px" }}>
				<i className="fa-solid fa-triangle-exclamation text-warning mb-4" style={{ fontSize: "5rem" }}></i>
				<h1 className="fw-bold mb-3">{t("page_not_found")}</h1>
				<p className="text-muted mb-4">{t("page_not_found_desc")}</p>

                {/* Go Back Button */}
				<button
					className="btn btn-main px-4 py-2 rounded-5 mt-2 d-flex gap-3 fs-5 mx-auto align-items-center"
					onClick={() => navigate("/")}
					aria-label={t("back_to_home")}
				>
					{t("back_to_home")}
					<span className="fa-solid fa-house mt-1"></span>
				</button>
			</div>
		</main>
	);
};

export default memo(NotFound);
