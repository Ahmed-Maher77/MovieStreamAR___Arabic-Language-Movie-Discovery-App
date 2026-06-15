import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useTranslation } from "react-i18next";

function useFetchTvSeries(page) {
	const { i18n } = useTranslation();
	const langParam = i18n.language === "ar" ? "ar" : "en-US";
	const apikey = import.meta.env.VITE_API_KEY;

	const fetchTvSeries = async () => {
		try {
			const res = await axios.get(
				`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=${langParam}&page=${page}`
			);
			return res.data;
		} catch (error) {
			throw new Error(
				"An Error occured while fetching TV Series data: " + error.message
			);
		}
	};
	
	const { data, isLoading, error } = useQuery({
		queryKey: ["tv_series", page, langParam],
		queryFn: fetchTvSeries,
		staleTime: 60000 * 10, // 10 minute stale time
		keepPreviousData: true, // Keeps old data while fetching new
	});
	
	if (!page || page < 1) {
		return;
	}

	return { data, isLoading, error: error?.message };
}
export default useFetchTvSeries;
