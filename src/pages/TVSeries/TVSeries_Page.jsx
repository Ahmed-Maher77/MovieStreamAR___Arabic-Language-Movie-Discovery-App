import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setSearchTvSeriesByValue } from "../../utils/redux-toolkit/searchTvSeries_Slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import useFetchTvSeries from "../../utils/api/useFetchTvSeries";
import useSearchTvSeries from "../../utils/api/useSearchTvSeries";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import { moviesListPageVariants } from "../../utils/Animations_Variants/Animations_Variants";
import AnimatedScrollToTop from "../../common/AnimatedScrollToTop";
import Pagination from "../MoviesList/Pagination";
import MovieCard from "../../components/MovieCard/MovieCard";

const TVSeries_Page = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const reduxSearchQuery = useSelector(
		(state) => state.search_tvseries.searchByValue
	);

	// Query params for pagination and search
	const [searchParams, setSearchParams] = useSearchParams();
	const initialPage = parseInt(searchParams.get("page"), 10) || 1;
	const initialSearch = searchParams.get("search") || "";
	const [page, setPage] = useState(initialPage);

	// Keep Redux search in sync with URL
	useEffect(() => {
		if (reduxSearchQuery !== initialSearch) {
			dispatch(setSearchTvSeriesByValue(initialSearch));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialSearch]);

	// Keep URL in sync with page and search
	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (page !== initialPage) params.set("page", page);
		if (reduxSearchQuery !== initialSearch)
			params.set("search", reduxSearchQuery);
		if (reduxSearchQuery === "") params.delete("search");
		if (page === 1) params.delete("page");
		setSearchParams(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, reduxSearchQuery]);

	// Update page/search state if URL changes (e.g. browser navigation)
	useEffect(() => {
		const urlPage = parseInt(searchParams.get("page"), 10) || 1;
		const urlSearch = searchParams.get("search") || "";
		if (urlPage !== page) setPage(urlPage);
		if (urlSearch !== reduxSearchQuery)
			dispatch(setSearchTvSeriesByValue(urlSearch));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	// When search changes, reset page to 1
	useEffect(() => {
		if (page !== 1 && reduxSearchQuery !== initialSearch) setPage(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reduxSearchQuery]);

	// Fetch all tv series (when not searching)
	const { data: allSeries, isLoading, error } = useFetchTvSeries(page);

	// Fetch searched tv series (if search query is present)
	const {
		data: searchedTvSeries,
		isLoading: isSearching,
		error: searchError,
	} = useSearchTvSeries(reduxSearchQuery);

	// Determine which tv series to display
	const isSearchingMode = reduxSearchQuery.length > 0;
	const tvSeriesToDisplay = useMemo(
		() => (isSearchingMode ? searchedTvSeries?.results : allSeries?.results),
		[isSearchingMode, searchedTvSeries, allSeries]
	);

	// Pagination logic (disabled for search results)
	const totalPages = isSearchingMode
		? 1 // No pagination for search results
		: Math.min(allSeries?.total_pages || 1, 500);
	const pageRange = 1; // Number of pages to show at a time
	const startPage = Math.max(1, page - Math.floor(pageRange / 2));
	const endPage = Math.min(totalPages, startPage + pageRange - 1);

	const handleSetPage = useCallback((newPage) => setPage(newPage), []);

	const isDataLoading = isSearchingMode ? isSearching : isLoading;
	const hasError = isSearchingMode ? searchError : error;

	// Handle loading state
	if (isDataLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "calc(100vh - 73px)" }}
			>
				<Loader
					title={isSearchingMode ? t("loading_search") : t("loading_movies")}
					aria-live="polite"
				/>
			</div>
		);
	}

	// Handle errors
	if (hasError) {
		return (
			<div
				className="text-center my-5"
				style={{ minHeight: "calc(100vh - 400px)" }}
			>
				<h2>{t("error_general")}</h2>
				<span className="red-color">{hasError}</span>
			</div>
		);
	}

	return (
		<motion.div
			className="TVSeries_Page overflow-hidden"
			style={{ minHeight: "calc(100vh - 73px)" }}
			key="TVSeries_Page"
			variants={moviesListPageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="container py-4">
				{/* ================== Display Data (Movies Cards) ================== */}
				<main className="row row-cols-xl-5">
					{tvSeriesToDisplay?.length > 0 ? (
						tvSeriesToDisplay?.map((series) => (
							<MovieCard
								key={series.id}
								imgSrc={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
								title={series.name}
								date={series.first_air_date}
								vote_count={series.vote_count}
								rate={series.vote_average}
								id={series.id}
								className="col-12 col-sm-6 col-md-4 col-lg-3 col"
							/>
						))
					) : (
						<div className="text-center my-5">
							<h2>
								{isSearchingMode
									? t("no_results")
									: t("no_series")}
							</h2>
						</div>
					)}
				</main>

				{/* ================== Pagination ================== */}
				{!isSearchingMode && totalPages > 1 && (
					<Pagination
						setPage={handleSetPage}
						page={page}
						startPage={startPage}
						endPage={endPage}
						totalPages={totalPages}
					/>
				)}

				{/* ================== Scroll to Top when page changes ================== */}
				<AnimatedScrollToTop dependancy={page} />
			</div>
		</motion.div>
	);
};

export default TVSeries_Page;
