import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

function useSearchMovies() {
    const { i18n } = useTranslation();
    const langParam = i18n.language === "ar" ? "ar" : "en-US";
	const apikey = import.meta.env.VITE_API_KEY;
    const movieName = useSelector(state => state.search_movies.searchByValue);

	const fetchMovies = async () => {
		try {
			const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movieName}&language=${langParam}`);
			return res.data;
		} catch (error) {
			throw new Error(
				"An Error occured while fetching movies data: " + error.message
			);
		}
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ["searched_movies", movieName, langParam],
		queryFn: fetchMovies,
		staleTime: 60000 * 10, // 10 minute stale time
		keepPreviousData: true, // Keeps old data while fetching new
	});
	
    return { data, isLoading, error: error?.message };
}
export default useSearchMovies;
