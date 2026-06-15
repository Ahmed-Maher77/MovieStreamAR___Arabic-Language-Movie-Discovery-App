import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const WatchlistButton = ({ isInWatchlist, onClick, isLoading }) => {
	const { t } = useTranslation();
	return (
		<div className="mb-3 text-end">
			<button
				className={`watchlist-btn ${isInWatchlist ? "remove" : "add"}`}
				onClick={onClick}
				disabled={isLoading}
			>
				{isLoading ? (
					<span
						className="spinner-border spinner-border-sm  small"
						role="status"
						aria-hidden="true"
					></span>
				) : (
					<>
						<span className="icon">
							{isInWatchlist ? (
								<span className="fa-solid fa-check"></span>
							) : (
								<span className="fa-solid fa-plus"></span>
							)}
						</span>
						{isInWatchlist ? t("remove_from_watchlist") : t("add_to_watchlist")}
					</>
				)}
			</button>
		</div>
	);
};

WatchlistButton.propTypes = {
	isInWatchlist: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
};

WatchlistButton.defaultProps = {
	isLoading: false,
};

export default WatchlistButton;
