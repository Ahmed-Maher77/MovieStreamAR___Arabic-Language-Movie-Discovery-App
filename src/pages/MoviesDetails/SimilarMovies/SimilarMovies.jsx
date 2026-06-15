import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader/Loader";
import Section_Heading from "../../../components/Section_Heading/Section_Heading";
import SimilarMovies_List from "./SimilarMovies_List";
import "./SimilarMovies.css";

const SimilarMovies = ({ data, isLoading, error, comingFrom }) => {
    const { t } = useTranslation();
    const [visibleCount, setVisibleCount] = useState(5);
    const itemsPerLoad = 5;

    // Loading State
    if (isLoading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "230px" }}
            >
                <Loader title={t("loading_similar")} />
            </div>
        );
    }

    // Error Handling
    if (error || !data) {
        return (
            <div className="text-center my-5">
                <h2>{t("error_general")}</h2>
                <span className="red-color">
                    {error || t("error_fetch_movie")}
                </span>
            </div>
        );
    }

    // Limit data to show only visible items
    const results = data?.results || [];
    const limitedData = {
        ...data,
        results: results.slice(0, visibleCount)
    };

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + itemsPerLoad, results.length));
    };

    const handleShowLess = () => {
        setVisibleCount(5);
    };

    const hasMoreItems = visibleCount < results.length;
    const hasHiddenItems = visibleCount > 5;

    return (
        <div className="Similar-Movies">
            <Section_Heading title={t("similar_movies_title")} text={t("similar_movies_text")} customStyle="mt-5" />
                
            <SimilarMovies_List data={limitedData} comingFrom={comingFrom} />
            
            {results.length > 5 && (
                <div className="text-center">
                    {hasMoreItems ? (
                        <button 
                            className="btn btn-outline-primary see-more-btn"
                            onClick={handleShowMore}
                        >
                            {t("show_more")} ({Math.min(itemsPerLoad, data.results.length - visibleCount)} {t("extra_movies")})
                        </button>
                    ) : hasHiddenItems ? (
                        <button 
                            className="btn btn-outline-secondary see-less-btn"
                            onClick={handleShowLess}
                        >
                            {t("show_less")}
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SimilarMovies;

SimilarMovies.propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    comingFrom: PropTypes.string.isRequired
};

