import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useCallback, memo } from "react";
import propTypes from "prop-types";
import "./MovieCard.css";
import MobileDescription from "./MobileDescription";
import DesktopDescription from "./DesktopDescription";
import { movieCardVariants } from "../../utils/Animations_Variants/Animations_Variants";

const MovieCard = memo(
	({ imgSrc, title, date, vote_count, rate, id, className = "" }) => {
		const navigate = useNavigate();
		const { pathname } = useLocation();
		const isLargeScreen = useSelector(
			(state) => state.window_properties.isLargeScreen
		);

		// Animation logic
		const [animationCount, setAnimationCount] = useState(0);
		const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

		// Prevents unnecessary re-renders of the function
		const handleNavigation = useCallback(() => {
			const isTv = pathname.includes("/tv-series");
			const from = isTv ? "tvSeriesPage" : "moviesPage";
			navigate(isTv ? `/tv-series/${id}` : `/movies/${id}`, { state: { from } });
		}, [navigate, id, pathname]);

		// Ensure state updates only when necessary
		if (inView && animationCount < 2) {
			setAnimationCount((prev) => prev + 1);
		}

		return (
			<motion.figure
				ref={ref}
				className={`MovieCard scroll-animation-box ${className}`}
				onClick={handleNavigation}
				variants={movieCardVariants}
				initial="hidden"
				animate={
					animationCount > 0 && animationCount <= 2 ? "visible" : "hidden"
				}
				role="button"
				aria-label={`View details for ${title}`}
				tabIndex={0}
				onKeyDown={(e) => e.key === "Enter" && handleNavigation()}
			>
				<div className="card position-relative">
					{/* =============== Image =============== */}
					<div className="card-img h-100">
						<img src={imgSrc} alt="Movie poster" className="w-100 h-100" />
					</div>

					{/* =============== Description >> based on the Screen Size =============== */}
					{isLargeScreen ? (
						<DesktopDescription
							title={title}
							date={date}
							vote_count={vote_count}
							rate={rate}
						/>
					) : (
						<MobileDescription title={title} rate={rate} />
					)}
				</div>
			</motion.figure>
		);
	}
);

// Add display name to prevent ESLint warning
MovieCard.displayName = "MovieCard";

// PropTypes Validation
MovieCard.propTypes = {
	imgSrc: propTypes.string.isRequired,
	title: propTypes.string.isRequired,
	date: propTypes.string.isRequired,
	vote_count: propTypes.number.isRequired,
	rate: propTypes.number.isRequired,
	id: propTypes.number.isRequired,
	className: propTypes.string,
};

export default MovieCard;
