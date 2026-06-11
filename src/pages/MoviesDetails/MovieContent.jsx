import { NavLink } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MoviePoster from "./MoviePoster";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import WatchlistButton from "./WatchlistButton";
import { useWatchlist } from "../../hooks/useWatchlist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import LoginModal from "../../components/LoginModal/LoginModal";

const MovieContent = ({
	poster_path,
	homepage,
	title,
	movieDetails,
	overview,
	id,
}) => {
	const { isInWatchlist, addMovie, removeMovie } = useWatchlist();
	const [isLoading, setIsLoading] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const isAuth = useSelector((state) => state.auth.isAuth);
	const handleLogin = useGoogleLogin();

	const isInWatchlistState = isInWatchlist(id);

	const handleWatchlist = async () => {
		if (!isAuth) {
			setShowLoginModal(true);
			return;
		}

		setIsLoading(true);
		if (isInWatchlistState) {
			await removeMovie(id);
			toast.success("تمت إزالة الفيلم من قائمة المشاهدة!");
		} else {
			await addMovie({ id, title, poster_path });
			toast.success("تمت إضافة الفيلم إلى قائمة المشاهدة!");
		}
		setIsLoading(false);
	};

	const handleLoginClick = () => {
		setShowLoginModal(false);
		handleLogin();
	};

	// Movie Details
	const details = useMemo(
		() =>
			movieDetails.map((detail, index) => (
				<MovieDetail key={index} label={detail.label} value={detail.value} />
			)),
		[movieDetails]
	);

	return (
		<main className="mb-3">
			<section className="d-flex gap-2 gap-md-3 gap-lg-4 flex-column flex-md-row align-items-md-center">
				{/* ================= Movie Poster ================= */}
				<MoviePoster
					posterPath={poster_path}
					homepage={homepage}
					title={title}
				/>

				{/* ================= Movie Details ================= */}
				<div className="details-info w-100">{details}</div>
			</section>

			<WatchlistButton
				isInWatchlist={isInWatchlistState}
				onClick={handleWatchlist}
				isLoading={isLoading}
			/>

			{/* ================= Movie Story ================= */}
			<section className="story p-3 gray-bg rounded-3 mt-4">
				<h3 className="mb-4 py-2 main-color">قصة الفيلم:</h3>
				<p>{overview || "غير متوفر"}</p>
			</section>

			{/* ================= Buttons Section ================= */}
			<section className="btns d-flex justify-content-center align-items-center my-4 gap-4 flex-wrap">
				{/* Watch Movie Button */}
				<a
					href={homepage || "#"}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-main d-flex gap-2 align-items-center"
					style={homepage ? {} : { pointerEvents: "none", opacity: 0.5 }}
					aria-label={homepage ? "مشاهدة الفيلم" : "زر غير مفعل"}
					tabIndex={homepage ? "0" : "-1"}
				>
					مشاهدة الفيلم
					<span className="fa-solid fa-video mt-1"></span>
				</a>

				{/* Back to Home Button */}
				<NavLink
					to="/"
					className="btn btn-main d-flex gap-2 align-items-center"
					aria-label="عودة للصفحة الرئيسية"
				>
					عودة للصفحة الرئيسية
					<span className="fa-solid fa-house"></span>
				</NavLink>
			</section>

			{/* Login Modal */}
			<LoginModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
				onLogin={handleLoginClick}
			/>
		</main>
	);
};

MovieContent.propTypes = {
	poster_path: PropTypes.string,
	homepage: PropTypes.string,
	title: PropTypes.string,
	movieDetails: PropTypes.array,
	id: PropTypes.string,
	overview: PropTypes.string,
};

export default memo(MovieContent);
