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
	const { state } = useLocation();

	const comingFrom = state?.from || "moviesPage";
	const { data: movieData, isLoading, error } = useFetchMovie(id, comingFrom);

    const dataType = comingFrom === "moviesPage" ? "movies" : "tv";
	const { data: similarMovies, isLoading_SimilarMovies, error_SimilarMovies } = useFetchSimilarMovies(dataType, 1, id);

	const { t } = useTranslation();

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
    const title = movieData.title || movieData.name;

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
