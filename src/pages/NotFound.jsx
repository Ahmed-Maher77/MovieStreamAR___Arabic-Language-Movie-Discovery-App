import { useNavigate } from "react-router-dom";
import { memo } from "react";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<main className="text-center d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 65px)", background: "var(--body-bg)" }}>
			<div className="container py-5 bg-white rounded-4 shadow-sm p-5" style={{ maxWidth: "500px" }}>
				<i className="fa-solid fa-triangle-exclamation text-warning mb-4" style={{ fontSize: "5rem" }}></i>
				<h1 className="fw-bold mb-3">الصفحة غير موجودة</h1>
				<p className="text-muted mb-4">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>

                {/* Go Back Button */}
				<button
					className="btn btn-main px-4 py-2 rounded-5 mt-2 d-flex gap-3 fs-5 mx-auto align-items-center"
					onClick={() => navigate("/")}
					aria-label="العودة للصفحة الرئيسية"
				>
					العودة للرئيسية
					<span className="fa-solid fa-house mt-1"></span>
				</button>
			</div>
		</main>
	);
};

export default memo(NotFound);
