import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { moviesDetailsPageVariants } from "../../utils/Animations_Variants/Animations_Variants";
import useFetchMovie from "../../utils/api/useFetchMovie";
import Loader from "../../components/Loader/Loader";
import formatList from "./formatList";
import GoBack_Btn from "./GoBack_Btn";
import MovieContent from "./MovieContent";
import "./MoviesDetails.css";
import SimilarMovies from "./SimilarMovies/SimilarMovies";
import useFetchSimilarMovies from "../../utils/api/useFetchSimilarMovies";


const MoviesDetails = () => {
	const { id } = useParams();
	const { state, pathname } = useLocation();

	// Determine initial type from location state or URL path prefix
	const initialComingFrom = state?.from || (pathname.startsWith("/tv-series") ? "tvSeriesPage" : "moviesPage");
	const { data: movieData, isLoading, error } = useFetchMovie(id, initialComingFrom);

	// Detect if it is actually a movie or tv series from the resolved data (TMDB tv objects have 'name' instead of 'title')
	const isTvShow = movieData ? (!movieData.title && !!movieData.name) : (initialComingFrom === "tvSeriesPage");
	const dataType = isTvShow ? "tv" : "movies";
	const comingFrom = isTvShow ? "tvSeriesPage" : "moviesPage";

	const { data: similarMovies, isLoading_SimilarMovies, error_SimilarMovies } = useFetchSimilarMovies(dataType, 1, id);

	const { t } = useTranslation();

	const title = movieData?.title || movieData?.name || "";

	useEffect(() => {
		if (title) {
			document.title = `${title} - MovieStreamAR`;
		}
		return () => { document.title = "MovieStreamAR"; };
	}, [title]);

	// Loading State
	if (isLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "calc(100vh - 73px)" }}
			>
				<Loader title={t("loading_movie_data")} />
			</div>
		);
	}

	// Error Handling
	if (error || !movieData) {
		return (
			<div
				className="text-center my-5"
				style={{ minHeight: "calc(100vh - 400px)" }}
			>
				<h2>{t("error_something_wrong")}</h2>
				<span className="red-color">
					{error || t("error_fetch_movie")}
				</span>
			</div>
		);
	}

	// Destructure Movie Data
	const {
		poster_path,
		homepage,
		vote_average,
		vote_count,
		release_date,
		runtime,
		production_countries = [],
		genres = [],
		spoken_languages = [],
		overview,
	} = movieData;

	// Formatters
	const formattedGenres = formatList(genres, "name");
	const formattedLanguages = formatList(spoken_languages, "name");
	const countryName = production_countries?.[0]?.name || t("not_available");
	const rating = vote_average
		? `${(Math.round(vote_average * 10) / 10).toFixed(1)} / 10`
		: "N/A";

	const movieDetails = [
		{ label: t("movie_name"), value: title },
		{ label: t("rating"), value: rating },
		{ label: t("rating_count"), value: vote_count || "N/A" },
		{ label: t("release_date"), value: release_date || t("not_available") },
		{
			label: t("duration"),
			value: runtime ? `${runtime} ${t("minutes")}` : t("not_available"),
		},
		{ label: t("country"), value: countryName },
		{ label: t("genre"), value: formattedGenres },
		{ label: t("languages"), value: formattedLanguages },
	];


	return (
		<motion.div
			className="Movies-Details overflow-hidden"
			style={{ minHeight: "calc(100vh - 75px)" }}
			key="Movies-Details"
			variants={moviesDetailsPageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="container">
				<GoBack_Btn />

				<MovieContent
					poster_path={poster_path}
					homepage={homepage}
					title={title}
					movieDetails={movieDetails}
					id={id}
					overview={overview}
				/>

				<SimilarMovies data={similarMovies} isLoading={isLoading_SimilarMovies} error={error_SimilarMovies} comingFrom={comingFrom} />
			</div>
		</motion.div>
	);
};

export default MoviesDetails;
