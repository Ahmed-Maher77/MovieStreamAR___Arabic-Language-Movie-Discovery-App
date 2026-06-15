import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../utils/api/firebase-config";

export default function useGoogleLogin() {
	return () => {
		signInWithRedirect(auth, provider);
	};
}
