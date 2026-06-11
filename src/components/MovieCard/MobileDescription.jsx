import propTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { truncateText } from "../../utils/Global_Functions/Global_Functions";

const MobileDescription = memo(({ title, rate }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	// update isSmallScreen state on window resize
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<figcaption className="card-body pt-5 pb-3 position-absolute bottom-0 w-100 px-4 d-flex justify-content-center align-items-center d-lg-none" aria-label={`Movie details for ${title}`}>
			<div>
				{/* Movie Title */}
				<h3 className="card-title text-center fs-5" style={{fontSize: isSmallScreen ? "1.1rem" : "1.2rem"}}>
					{isSmallScreen ? truncateText(title, 17) : truncateText(title, 13)}
				</h3>

				{/* Movie Details */}
				<div className="details d-flex flex-column gap-2 text-center mt-2">
					<div className="rating-stars d-flex flex-row-reverse gap-1 justify-content-center mt-2">
						{Array(5)
							.fill(null)
							.map((_, i) => (
								<span
									key={i}
									className={`fa-solid fa-star ${
										Math.round(+rate / 2) > i ? "text-warning" : ""
									}`}
									aria-hidden="true"
								></span>
							))}
					</div>
				</div>
			</div>
		</figcaption>
	);
});

// Add display name to prevent ESLint warning
MobileDescription.displayName = "MobileDescription";

// PropTypes validation
MobileDescription.propTypes = {
	title: propTypes.string.isRequired,
	rate: propTypes.number.isRequired,
};

export default MobileDescription;