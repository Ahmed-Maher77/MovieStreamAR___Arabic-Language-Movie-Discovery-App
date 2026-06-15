import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
function useFetchMovie(id, comingFrom) {
	const { i18n } = useTranslation();
	const langParam = i18n.language === "ar" ? "ar" : "en-US";
	const apikey = import.meta.env.VITE_API_KEY;

	const fetchMovieDetails = async () => {
		const movieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=${langParam}&append_to_response=credits`;
		const tvApi = `https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}&language=${langParam}&append_to_response=credits`;
		const primaryApi = comingFrom === "moviesPage" ? movieApi : tvApi;
		const fallbackApi = comingFrom === "moviesPage" ? tvApi : movieApi;

		try {
			const res = await axios.get(primaryApi);
			return res.data;
		} catch (error) {
			try {
				// Fallback to fetch from the alternate endpoint (e.g. if media type is wrong or route mismatch)
				const resFallback = await axios.get(fallbackApi);
				return resFallback.data;
			} catch (fallbackError) {
				throw new Error(
					"An Error occured while fetching movie data: " + fallbackError.message
				);
			}
		}
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ["movie", id, langParam],
		queryFn: fetchMovieDetails,
		staleTime: 10000,
		enabled: !!id, // Ensures the query runs only if `id` is provided >> !! to ensure it is a boolean value
	});
	return { data, isLoading, error: error?.message };
}
export default useFetchMovie;
