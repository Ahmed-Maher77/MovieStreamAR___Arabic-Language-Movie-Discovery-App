import PropTypes from "prop-types";
import "./Section_Heading.css";
import i18n from "../../../i18n";

const Section_Heading = ({ title, sliderControls }) => {
	const isRTL = i18n.language === "ar";
	return (
		<header className="Section-Heading d-flex justify-content-between align-items-center mb-4">
			<h2 className="section-title main-color mb-0 fs-4 fw-bold">{title}</h2>

			{/* ================== Navigation buttons ================== */}
			{sliderControls && (
				<div className="slider-controls d-flex gap-2">
					<button
						className="btn-control prev"
						onClick={sliderControls.prev}
						disabled={sliderControls.isPrevDisabled}
						aria-label="Previous slide"
					>
						<span className={`fa-solid ${isRTL ? "fa-chevron-right" : "fa-chevron-left"}`}></span>
					</button>
					<button
						className="btn-control next"
						onClick={sliderControls.next}
						disabled={sliderControls.isNextDisabled}
						aria-label="Next slide"
					>
						<span className={`fa-solid ${isRTL ? "fa-chevron-left" : "fa-chevron-right"}`}></span>
					</button>
				</div>
			)}
		</header>
	);
};

Section_Heading.propTypes = {
	title: PropTypes.string.isRequired,
	sliderControls: PropTypes.shape({
		prev: PropTypes.func,
		next: PropTypes.func,
		isPrevDisabled: PropTypes.bool,
		isNextDisabled: PropTypes.bool,
	}),
};

export default Section_Heading;
