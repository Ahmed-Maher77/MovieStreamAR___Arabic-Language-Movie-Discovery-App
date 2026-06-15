import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./utils/redux-toolkit/store";
import { Provider } from "react-redux";
import React, { Suspense, useMemo } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MainLoader from "./components/Loader/MainLoader";
import RequireAuth from "./common/Authentication/RequireAuth.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthProvider from "./common/Authentication/AuthProvider";
import ToastWrapper from "./components/ToastWrapper/ToastWrapper";
import TVSeries_Page from "./pages/TVSeries/TVSeries_Page.jsx";
import "./i18n";

// Lazy-loaded pages to improve performance
const MoviesList = React.lazy(() => import("./pages/MoviesList/MoviesList"));
const MoviesDetails = React.lazy(() => import("./pages/MoviesDetails/MoviesDetails"));
const Watchlist = React.lazy(() => import("./pages/Watchlist/Watchlist"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));
const AboutUs = React.lazy(() => import("./pages/AboutUs/AboutUs.jsx"));


function App() {
	const router = useMemo(
		() =>
			createBrowserRouter([
				{
					element: <Layout />,
					children: [
						{ path: "/", element: <Home /> },
						{
							path: "/movies",
							element: (
								<Suspense fallback={<MainLoader />}>
									<MoviesList />
								</Suspense>
							),
						},
						{
							path: "/movies/:id",
							element: (
								<Suspense fallback={<MainLoader />}>
									<MoviesDetails />
								</Suspense>
							),
						},
						{
							path: "/tv-series", 
							element: (
								<Suspense fallback={<MainLoader />}>
									<TVSeries_Page />
								</Suspense>
							),
						},
						{
							path: "/profile",
							element: (
								<Suspense fallback={<MainLoader />}>
									<RequireAuth>
										<Profile />
									</RequireAuth>
								</Suspense>
							),
						},
						{
							path: "/watchlist",
							element: (
								<Suspense fallback={<MainLoader />}>
									<RequireAuth>
										<Watchlist />
									</RequireAuth>
								</Suspense>
							),
						},
						{
							path: "/about-us",
							element: (
								<Suspense fallback={<MainLoader />}>
									<AboutUs />
								</Suspense>
							),
						},
						{
							path: "*",
							id: "notFound",
							element: (
								<Suspense fallback={<MainLoader />}>
									<NotFound />
								</Suspense>
							),
						},
					],
				},
			]),
		[]
	);

	return (
		<Provider store={store}>
			<ToastWrapper />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	);
}

export default App;
