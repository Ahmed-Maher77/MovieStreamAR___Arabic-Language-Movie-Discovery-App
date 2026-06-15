import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useTranslation } from "react-i18next";

function useFetchAllMovies(page) {
	const { i18n } = useTranslation();
	const langParam = i18n.language === "ar" ? "ar" : "en-US";
	const apikey = import.meta.env.VITE_API_KEY;

	const fetchMovies = async () => {
		try {
			const res = await axios.get(
				`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=${langParam}&page=${page}`
			);
			return res.data;
		} catch (error) {
			throw new Error(
				"An Error occured while fetching movies data: " + error.message
			);
		}
	};
	
	const { data, isLoading, error } = useQuery({
		queryKey: ["movies", page, langParam],
		queryFn: fetchMovies,
		staleTime: 60000 * 10, // 10 minute stale time
		placeholderData: (prev) => prev, // Keeps old data while fetching new (React Query v5 standard)
		enabled: !!page && page >= 1, // Only run query if page is valid
	});
	
	if (!page || page < 1) {
		return { data: null, isLoading: false, error: "Invalid page number" };
	}

	return { data, isLoading, error: error?.message };
}
export default useFetchAllMovies;
