import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/api/firebase-config";
import i18n from "../i18n";
import { toast } from "react-toastify";

export default function useGoogleLogin() {
	return async () => {
		try {
			await signInWithPopup(auth, provider);
			const isRTL = i18n.language === "ar";
			toast.success(i18n.t("login_success"), { rtl: isRTL });
		} catch (error) {
			console.error("Firebase Popup Auth Error:", error);
			const isRTL = i18n.language === "ar";
			toast.error(i18n.t("login_error"), { rtl: isRTL });
		}
	};
}
