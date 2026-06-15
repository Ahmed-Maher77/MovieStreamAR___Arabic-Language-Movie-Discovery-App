import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./utils/redux-toolkit/store";
import { Provider } from "react-redux";
import { useMemo } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import RequireAuth from "./common/Authentication/RequireAuth.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import MoviesList from "./pages/MoviesList/MoviesList";
import MoviesDetails from "./pages/MoviesDetails/MoviesDetails";
import Watchlist from "./pages/Watchlist/Watchlist";
import NotFound from "./pages/NotFound.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import TVSeries_Page from "./pages/TVSeries/TVSeries_Page.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthProvider from "./common/Authentication/AuthProvider";
import ToastWrapper from "./components/ToastWrapper/ToastWrapper";
import "./i18n";


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
							element: <MoviesList />,
						},
						{
							path: "/movies/:id",
							element: <MoviesDetails />,
						},
						{
							path: "/tv-series/:id",
							element: <MoviesDetails />,
						},
						{
							path: "/tv-series", 
							element: <TVSeries_Page />,
						},
						{
							path: "/profile",
							element: <RequireAuth><Profile /></RequireAuth>,
						},
						{
							path: "/watchlist",
							element: <RequireAuth><Watchlist /></RequireAuth>,
						},
						{
							path: "/about-us",
							element: <AboutUs />,
						},
						{
							path: "*",
							id: "notFound",
							element: <NotFound />,
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
