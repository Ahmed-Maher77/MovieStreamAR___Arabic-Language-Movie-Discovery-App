import { useSelector, useDispatch } from "react-redux";
import {
	addToWatchlist,
	removeFromWatchlist,
	updateMovieStatus,
} from "../utils/redux-toolkit/watchlistSlice";

export const useWatchlist = () => {
	const dispatch = useDispatch();
	const watchlist = useSelector((state) => state.watchlist.items);
	const userData = useSelector((state) => state.auth.userData);

	const addMovie = async (movie) => {
		if (!userData) return;
        

		const movieData = {
			id: movie.id.toString(),
			title: movie.title,
			poster_path: movie.poster_path,
			isWatched: false,
		};

		await dispatch(
			addToWatchlist({
				userId: userData.uid,
				movie: movieData,
				name: userData.displayName,
				email: userData.email,
			})
		);
	};

	const removeMovie = async (movieId) => {
		if (!userData) return;
		await dispatch(removeFromWatchlist({ userId: userData.uid, movieId }));
	};

	const toggleWatched = async (movieId, isWatched) => {
		if (!userData) return;
		await dispatch(
			updateMovieStatus({ userId: userData.uid, movieId, isWatched })
		);
	};

	const isInWatchlist = (movieId) => {
		return watchlist.some((movie) => movie.id === movieId.toString());
	};

	const getMovieStatus = (movieId) => {
		const movie = watchlist.find((movie) => movie.id === movieId.toString());
		return movie ? movie.isWatched : false;
	};

	return {
		watchlist,
		addMovie,
		removeMovie,
		toggleWatched,
		isInWatchlist,
		getMovieStatus,
	};
};
