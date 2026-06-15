import { useSelector } from "react-redux";
import { auth } from "../../utils/api/firebase-config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileActions from "../../components/Profile/ProfileActions";

const Profile = () => {
	const { t, i18n } = useTranslation();
	const user = useSelector((state) => state.auth.userData);
	const authLoading = useSelector((state) => state.auth.authLoading);
	const isRTL = i18n.language === "ar";

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success(t("logout_success"), { rtl: isRTL });
		} catch (error) {
			toast.error(t("logout_error"), { rtl: isRTL });
		}
	};

	if (authLoading) {
		return null; // Or a loader component
	}

	if (!user || !user.uid) {
		return (
			<div
				className="Profile-Page page-height d-flex align-items-center justify-content-center bg-gradient"
				style={{ minHeight: "70vh" }}
			>
				<div className="container">
					<div className="text-center">
						<h2>{t("login_required")}</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="Profile-Page page-height d-flex align-items-center justify-content-center bg-gradient"
			style={{
				background: "linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%)",
			}}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div style={{ width: "100%", maxWidth: "525px" }}>
						<div
							className="card rounded-4 border-0 p-4 animate__animated animate__fadeInUp"
							style={{ background: "rgba(255,255,255,0.97)" }}
						>
							<div className="d-flex flex-column align-items-center position-relative mb-3">
								<ProfileAvatar
									photoURL={user.photoURL}
									displayName={user.displayName}
								/>
								<ProfileInfo
									displayName={user.displayName}
									email={user.email}
									uid={user.uid}
									emailVerified={user.emailVerified}
								/>
							</div>
							<hr className="my-2" style={{ borderTop: "2px solid #ddd" }} />
							<ProfileActions
								onEdit={() => toast.info("سيتم إضافة هذه الميزة قريباً")}
								onChangePassword={() =>
									toast.info("سيتم إضافة هذه الميزة قريباً")
								}
								onLogout={handleLogout}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
