import { motion } from "framer-motion";
import { moviesDetailsPageVariants } from "../../utils/Animations_Variants/Animations_Variants";
import LoadingState from "../../components/Watchlist/LoadingState";
import ErrorState from "../../components/Watchlist/ErrorState";
import EmptyState from "../../components/Watchlist/EmptyState";
import MovieCard from "../../components/Watchlist/MovieCard";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styles from "./Watchlist.module.css";
import "./Watchlist.css";
import ToggleBar from "../../components/Watchlist/ToggleBar";
import { useSelector } from "react-redux";

const Watchlist = () => {
	const { t, i18n } = useTranslation();
	const {
		watchlist,
		removeMovie,
		toggleWatched,
	} = useWatchlist();
	const { loading, error } = useSelector((state) => state.watchlist);
	const [removingId, setRemovingId] = useState(null);
	const [togglingWatchedId, setTogglingWatchedId] = useState(null);
	const [showWatched, setShowWatched] = useState(false);

	const handleRemoveMovie = async (movieId) => {
		setRemovingId(movieId);
		await removeMovie(movieId);
		toast.success(t("removed_from_watchlist"), { rtl: i18n.language === "ar" });
		setRemovingId(null);
	};

	const handleToggleWatched = async (movieId, currentStatus) => {
		setTogglingWatchedId(movieId);
		await toggleWatched(movieId, !currentStatus);
		setTogglingWatchedId(null);
	};

	const watchedCount = watchlist.filter((m) => m.isWatched).length;
	const notWatchedCount = watchlist.filter((m) => !m.isWatched).length;
	const filteredMovies = watchlist.filter(
		(movie) => !!movie.isWatched === showWatched
	);

	if (loading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState error={error} />;
	}

	return (
		<motion.div
			className="watchlist-page"
			variants={moviesDetailsPageVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<div className="container pb-4">
				<div className="text-center">
					<h1 className="watchlist-heading">
						{t("watchlist")}
						<span className="lower-line"></span>
					</h1>
				</div>

				<ToggleBar
					showWatched={showWatched}
					setShowWatched={setShowWatched}
					watchedCount={watchedCount}
					notWatchedCount={notWatchedCount}
					styles={styles}
				/>

				{filteredMovies.length === 0 ? (
					<EmptyState />
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
						{filteredMovies.map((movie) => (
							<MovieCard
								key={String(movie.id)}
								movie={movie}
								onRemove={handleRemoveMovie}
								isRemoving={removingId === movie.id}
								onToggleWatched={() =>
									handleToggleWatched(movie.id, movie.isWatched)
								}
								isTogglingWatched={togglingWatchedId === movie.id}
							/>
						))}
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Watchlist;
