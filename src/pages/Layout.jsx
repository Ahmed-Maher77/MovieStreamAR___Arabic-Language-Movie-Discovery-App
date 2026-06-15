import { Outlet, useLocation, useMatches } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { setIsLargeScreen, setPageDirection } from "../utils/redux-toolkit/windowSlice.js";
import Footer from "../components/Footer/Footer.jsx";
import AnimatedScrollToTop from "../common/AnimatedScrollToTop.jsx";
import i18n from "../i18n";

const Layout = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const matches = useMatches();
	const isNotFound = matches.some((m) => m.id === "notFound");

	const handleResize = useCallback(() => {
		dispatch(setIsLargeScreen(window.innerWidth > 991));
	}, [dispatch]);

	// Sync page direction with i18n language
	useEffect(() => {
		const handleLanguageChange = (lng) => {
			dispatch(setPageDirection(lng === "ar" ? "rtl" : "ltr"));
		};
		handleLanguageChange(i18n.language);
		i18n.on("languageChanged", handleLanguageChange);
		return () => {
			i18n.off("languageChanged", handleLanguageChange);
		};
	}, [dispatch]);

	useLayoutEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return (
		<div>
			<AnimatedScrollToTop />

			{!isNotFound && <NavBar />}
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
