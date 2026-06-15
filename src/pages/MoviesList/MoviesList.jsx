import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setSearchByValue } from "../../utils/redux-toolkit/searchMovies_Slice";
import MovieCard from "../../components/MovieCard/MovieCard";
import useFetchAllMovies from "../../utils/api/useFetchAllMovies";
import useSearchMovies from "../../utils/api/useSearchMovies";
import Loader from "../../components/Loader/Loader";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { moviesListPageVariants } from "../../utils/Animations_Variants/Animations_Variants";
import AnimatedScrollToTop from "../../common/AnimatedScrollToTop";

const MoviesList = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const reduxSearchQuery = useSelector(
		(state) => state.search_movies.searchByValue
	);

	// Query params for pagination and search
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page"), 10) || 1;
	const urlSearch = searchParams.get("search") || "";

	// Fetch all movies (when not searching)
	const { data: allMovies, isLoading, error } = useFetchAllMovies(page);

	// Fetch searched movies (if search query is present)
	const {
		data: searchedMovies,
		isLoading: isSearching,
		error: searchError,
	} = useSearchMovies(urlSearch);

	// Log navigation for debugging
	useEffect(() => {
		console.log(`[MoviesList] Mounted - page: ${page}, search: "${urlSearch}"`);
		return () => console.log("[MoviesList] Unmounted");
	}, []);

	useEffect(() => {
		if (!isLoading && !error && allMovies) {
			console.log(`[MoviesList] Data loaded - ${allMovies.results?.length || 0} movies, page ${page}`);
		}
	}, [isLoading, error, allMovies, page]);

	// Determine which movies to display
	const isSearchingMode = urlSearch.length > 0;
	const moviesToDisplay = useMemo(
		() => (isSearchingMode ? searchedMovies?.results : allMovies?.results),
		[isSearchingMode, searchedMovies, allMovies]
	);

	// Pagination logic (disabled for search results)
	const totalPages = isSearchingMode
		? 1 // No pagination for search results
		: Math.min(allMovies?.total_pages || 1, 500);
	const pageRange = 1; // Number of pages to show at a time
	const startPage = Math.max(1, page - Math.floor(pageRange / 2));
	const endPage = Math.min(totalPages, startPage + pageRange - 1);

	const handleSetPage = useCallback(
		(newPage) => {
			const params = new URLSearchParams(searchParams);
			if (newPage > 1) {
				params.set("page", newPage);
			} else {
				params.delete("page");
			}
			setSearchParams(params);
		},
		[searchParams, setSearchParams]
	);

	const isDataLoading = isSearchingMode ? isSearching : isLoading;
	const hasError = isSearchingMode ? searchError : error;

	// Handle loading state
	if (isDataLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "calc(100vh - 73px)" }}
			>
				<Loader title={t("loading_movies")} aria-live="polite" />
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
			className="MoviesList overflow-hidden"
			style={{ minHeight: "calc(100vh - 73px)" }}
			key="MoviesList"
			variants={moviesListPageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="container py-4">
				{/* ================== Display Data (Movies Cards) ================== */}
				<main className="row row-cols-xl-5">
					{moviesToDisplay?.length > 0 ? (
						moviesToDisplay?.map((movie) => (
							<MovieCard
								key={movie.id}
								imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								title={movie.title}
								date={movie.release_date}
								vote_count={movie.vote_count}
								rate={movie.vote_average}
								id={movie.id}
								className="col-12 col-sm-6 col-md-4 col-lg-3"
							/>
						))
					) : (
						<div className="text-center my-5">
							<h2>{t("no_movies")}</h2>
						</div>
					)}
				</main>

				{/* ================== Pagination ================== */}
				<Pagination
					setPage={handleSetPage}
					page={page}
					startPage={startPage}
					endPage={endPage}
					totalPages={totalPages}
				/>

				{/* ================== Scroll to Top when page changes ================== */}
				<AnimatedScrollToTop dependancy={page} />
			</div>
		</motion.div>
	);
};

export default memo(MoviesList);
