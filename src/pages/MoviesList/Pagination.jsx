/* eslint-disable react/prop-types */
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";


const Pagination = ({setPage, page, startPage, endPage, totalPages}) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const handleSetPage = useCallback((newPage) => setPage(newPage), [setPage]);

    if (totalPages <= 1) {
        return null
    };

    return (
        <footer className="Pagination text-center my-3">
            <div className="btn-group gap-2" role="group" aria-label="navigation buttons" style={{marginInline: "auto"}}>
            {/* =================== Previous Button =================== */}
            <button className="btn btn-outline-primary" onClick={() => handleSetPage(page - 1)} disabled={page <= 1} style={{borderRadius: isRTL ? "0 5px 5px 0" : "5px 0 0 5px"}} aria-label="Previous page">
                {t("previous")}
            </button>

            {/* =================== Page Numbers (Limited to range) =================== */}
            {startPage > 1 && <button className="btn btn-outline-primary" onClick={() => handleSetPage(1)}>1</button>}
            {startPage > 2 && <span>...</span>} {/* Show ellipsis if necessary */}
            {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNumber = startPage + i;
                return (
                    <button 
                        key={pageNumber}
                        className={`btn ${page === pageNumber ? "btn-primary text-white active" : "btn-outline-primary"}`} 
                        onClick={() => handleSetPage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            {endPage < totalPages - 1 && <span>...</span>}{" "}
            {/* Show ellipsis if necessary */}
            {endPage < totalPages && (
                <button className="btn btn-outline-primary" onClick={() => handleSetPage(totalPages)}>{totalPages}</button>
            )}

            {/* =================== Next Button===================  */}
            <button className="next-btn btn btn-outline-primary" onClick={() => handleSetPage(page + 1)} disabled={page >= totalPages} style={{borderRadius: isRTL ? "5px 0 0 5px" : "0 5px 5px 0"}} aria-label="Next page">
                {t("next")}
            </button>
            </div>
        </footer>
    )
}

export default memo(Pagination);
