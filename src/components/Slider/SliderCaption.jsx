import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { 
		opacity: 1, 
		y: 0, 
		transition: { duration: 0.6, ease: "easeOut" } 
	},
};

const SliderCaption = ({ movie, isActive }) => {
	const navigate = useNavigate();
	const isLargeScreen = useSelector((state) => state.isLargeScreen);

	const trimmedOverview = useMemo(() => 
		isLargeScreen ? movie.overview : `${movie.overview.slice(0, 100)}...`,
		[isLargeScreen, movie.overview]
	);

	return (
		<motion.div 
			className="carousel-caption text-end col-12 position-static" 
			style={{ paddingBottom: "100px" }}
			initial="initial"
			animate={isActive ? "animate" : "initial"}
			variants={containerVariants}
		>
			<div className="container px-0">
				
				{/* Movie Title */}
				<motion.h1 
					className="fw-bold mb-3 text-white" 
					style={{ fontSize: "clamp(2.5rem, 6vw + 1rem, 4.5rem)", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
					variants={itemVariants}
				>
					{movie.title}
				</motion.h1>

				{/* Metadata Pills */}
				<motion.div 
					className="d-flex flex-wrap gap-2 mb-4 align-items-center"
					variants={itemVariants}
				>
					<span className="badge bg-dark border border-secondary px-3 py-2 fs-6 opacity-75">+18</span>
					<span className="badge bg-dark border border-secondary px-3 py-2 fs-6 opacity-75">2 ساعة 15 دقيقة</span>
					<span className="badge bg-dark border border-secondary px-3 py-2 fs-6 opacity-75">أكشن</span>
					<span className="badge bg-dark border border-secondary px-3 py-2 fs-6 opacity-75">دراما</span>
					<span className="badge bg-dark border border-secondary px-3 py-2 fs-6 opacity-75">2024</span>
				</motion.div>

				{/* Movie Overview */}
				<motion.p 
					className="fs-5 text-light mb-4"
					style={{ maxWidth: "550px", lineHeight: "1.6", opacity: "0.85", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
					variants={itemVariants}
				>
					{trimmedOverview}
				</motion.p>

				{/* Buttons Row */}
				<motion.div 
					className="d-flex gap-3 mb-4"
					variants={itemVariants}
				>
					<button 
						className="slider-btn-primary"
						onClick={() => navigate(`/movies/${movie.id}`)}
					>
						<span className="fa-solid fa-play"></span>
						شاهد الآن
					</button>
					<button 
						className="slider-btn-secondary"
					>
						<span className="fa-solid fa-plus"></span>
						قائمتي
					</button>
				</motion.div>

				{/* Footer Stats */}
				<motion.div 
					className="d-flex align-items-center gap-4 mt-4" 
					variants={itemVariants}
				>
					<div className="d-flex flex-column align-items-start">
						<span className="fs-4 fw-bold text-white">{movie.view}</span>
						<span className="text-secondary fs-6">مشاهدة</span>
					</div>
					<div style={{ width: "1px", height: "45px", backgroundColor: "rgba(255,255,255,0.2)" }}></div>
					<div className="d-flex flex-column align-items-start">
						<span className="fs-4 fw-bold text-white">{movie.rating}</span>
						<span className="text-secondary fs-6">IMDb تقييم</span>
					</div>
				</motion.div>

			</div>
		</motion.div>
	);
};

SliderCaption.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		overview: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
		view: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
};

export default memo(SliderCaption);
