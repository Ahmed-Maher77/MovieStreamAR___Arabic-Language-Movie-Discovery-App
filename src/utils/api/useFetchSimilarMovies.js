import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useTranslation } from "react-i18next";

function useFetchSimilarMovies(dataType, page, id, limit = null) {
    const { i18n } = useTranslation();
    const langParam = i18n.language === "ar" ? "ar" : "en-US";
    const apikey = import.meta.env.VITE_API_KEY;

    const fetchMovies = async () => {
        if (!id) {
            throw new Error("Movie ID is required.");
        }
        if (!page || page < 1) {
            throw new Error("Invalid page number: " + page);
        }
        try {
            const res = await axios.get(
                dataType == "movies"?
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apikey}&language=${langParam}&page=${page}` :
                `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apikey}&language=${langParam}&page=${page}`
            );

            console.log("Fetched Similar Movies Data:", res.data);
            
            
            // Apply limit only if specified, otherwise return all results
            const limitedData = limit 
                ? {
                    ...res.data,
                    results: res.data.results.slice(0, limit)
                }
                : res.data;
                
            return limitedData;
        } catch (error) {
            throw new Error(
                "An Error occured while fetching similar movies data: " + error.message
            );
        }
    };
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["similar_movies", page, id, limit, langParam],
        queryFn: fetchMovies,
        staleTime: 60000 * 10, // 10 minute stale time
        keepPreviousData: true, // Keeps old data while fetching new
        enabled: !!id && !!page && page >= 1, // Only run if id and valid page are provided
    });

    // Provide consistent return shape
    if (!id) {
        console.error("Movie ID is required to fetch similar movies.");
        return { data: null, isLoading: false, error: "Movie ID is required." };
    }
    if (!page || page < 1) {
        console.error("Invalid page number:", page);
        return { data: null, isLoading: false, error: "Invalid page number." };
    }

    return { data, isLoading, error: error?.message };
}
export default useFetchSimilarMovies;
