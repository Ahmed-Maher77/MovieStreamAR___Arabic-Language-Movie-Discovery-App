import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileInfo = ({ displayName, email, uid, emailVerified }) => {
	const { t } = useTranslation();
	const [copiedUid, setCopiedUid] = useState(false);
	const [copiedEmail, setCopiedEmail] = useState(false);
	const uidRef = useRef();
	const emailRef = useRef();

	const handleCopyUid = () => {
		navigator.clipboard.writeText(uid);
		setCopiedUid(true);
		setTimeout(() => setCopiedUid(false), 1200);
	};

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(email);
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 1200);
	};

	return (
		<>
			<h2 className="fw-bold mb-5 text-center d-flex align-items-center justify-content-center gap-1">
				{displayName}
				{emailVerified && (
					<span
						className="text-success ms-2"
						title={t("email_verified")}
					>
						<i className="bi bi-patch-check-fill d-inline-block mt-1"></i>
					</span>
				)}
			</h2>
			<div className="user-info-box mb-3 rounded-3  bg-white w-100" style={{ maxWidth: "390px" }}>
				<div className="d-flex align-items-center mb-3 flex-wrap">
					<i className="bi bi-envelope-at me-2 text-primary fs-5"></i>
					<span className="fw-bold me-2">{t("email")}:</span>
					<span ref={emailRef} className="fs-6 text-break me-2">
						{email}
					</span>
					<button
						className="btn btn-sm btn-outline-secondary mx-2"
						style={{ borderRadius: "50%" }}
						onClick={handleCopyEmail}
						title={t("copy_email")}
					>
						<i
							className={`bi ${
								copiedEmail
									? "bi-clipboard-check-fill text-success"
									: "bi-clipboard"
							}`}
						></i>
					</button>
					{copiedEmail && (
						<span className="ms-2 text-success small">{t("copied")}</span>
					)}
				</div>
				<div className="d-flex align-items-center flex-wrap">
					<i className="bi bi-hash me-2 text-secondary fs-5"></i>
					<span className="fw-bold me-2">{t("user_id")}:</span>
					<span
						ref={uidRef}
						className="text-muted small user-select-all mx-2"
						style={{ fontFamily: "monospace" }}
					>
						{uid}
					</span>
					<button
						className="btn btn-sm btn-outline-secondary ms-2"
						style={{ borderRadius: "50%" }}
						onClick={handleCopyUid}
						title={t("copy_id")}
					>
						<i
							className={`bi ${
								copiedUid
									? "bi-clipboard-check-fill text-success"
									: "bi-clipboard"
							}`}
						></i>
					</button>
					{copiedUid && (
						<span className="ms-2 text-success small">{t("copied")}</span>
					)}
				</div>
			</div>
		</>
	);
};

ProfileInfo.propTypes = {
	displayName: PropTypes.string,
	email: PropTypes.string,
	uid: PropTypes.string,
	emailVerified: PropTypes.bool,
};

export default ProfileInfo;
