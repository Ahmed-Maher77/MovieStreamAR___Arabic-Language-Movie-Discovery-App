import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "../../utils/api/firebase-config";
import {
	setIsAuth,
	setUserData,
	setAuthLoading,
} from "../../utils/redux-toolkit/authSlice";
import {
	fetchWatchlist,
	addToWatchlist,
} from "../../utils/redux-toolkit/watchlistSlice";
import i18n from "../../i18n";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setAuthLoading(true));

		getRedirectResult(auth)
			.then((result) => {
				if (result) {
					const isRTL = i18n.language === "ar";
					toast.success(i18n.t("login_success"), { rtl: isRTL });

					const pendingRaw = sessionStorage.getItem("pendingMovie");
					if (pendingRaw) {
						sessionStorage.removeItem("pendingMovie");
						const movie = JSON.parse(pendingRaw);
						const movieData = {
							id: String(movie.id),
							title: movie.title,
							poster_path: movie.poster_path || "",
							isWatched: false,
						};
						dispatch(
							addToWatchlist({
								userId: result.user.uid,
								movie: movieData,
								name: result.user.displayName,
								email: result.user.email,
							})
						).catch(() => {});
						toast.success(i18n.t("added_to_watchlist"), { rtl: isRTL });
					}
				}
			})
			.catch(() => {
				const isRTL = i18n.language === "ar";
				toast.error(i18n.t("login_error"), { rtl: isRTL });
			});

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setIsAuth(true));
				dispatch(
					setUserData({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						emailVerified: user.emailVerified,
					})
				);
				dispatch(
					fetchWatchlist({
						userId: user.uid,
						name: user.displayName,
						email: user.email,
					})
				);
			} else {
				dispatch(setIsAuth(false));
				dispatch(setUserData(null));
			}
			dispatch(setAuthLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return children;
};

export default AuthProvider;
