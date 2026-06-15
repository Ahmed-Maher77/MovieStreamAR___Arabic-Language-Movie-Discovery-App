import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

const MoviePoster = ({ posterPath, homepage, title }) => {
	const { t } = useTranslation();
	return (
		<figure className="position-relative m-2 p-0 rounded-2 overflow-hidden">
			<img
				className="d-block w-100 h-100"
				src={`https://image.tmdb.org/t/p/w500${posterPath}`}
				alt={`${title} Poster`}
			/>
			{homepage && (
				<a
					className="poster-overlay position-absolute w-100 h-100 start-0 top-0 d-flex align-items-center justify-content-center fw-bold text-decoration-none white-color fs-5"
					href={homepage}
					title={t("watch_now")}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>{t("watch_now")}</span>
				</a>
			)}
		</figure>
	);
};

// Props Validation
MoviePoster.propTypes = {
    posterPath: propTypes.string.isRequired,
    homepage: propTypes.string,
    title: propTypes.string.isRequired,
};

export default MoviePoster;