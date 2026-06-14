import { useTranslation } from "react-i18next";

const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <div className="text-center py-5">
            <i className="fas fa-film fa-3x mb-3 text-muted"></i>
            <p className="text-muted">{t("empty_watchlist")}</p>
        </div>
    );
};

export default EmptyState; 