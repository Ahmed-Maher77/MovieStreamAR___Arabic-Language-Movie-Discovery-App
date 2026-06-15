import propTypes from "prop-types";
import { memo } from "react";
import { truncateText } from "../../utils/Global_Functions/Global_Functions";

const DesktopDescription = memo(({ title, date, vote_count, rate }) => {
	return (
		<figcaption className="card-body position-absolute w-100 h-100 px-4 d-flex justify-content-center align-itemx-center d-none d-lg-flex" aria-label={`Movie details for ${title}`} style={{paddingBlock: "2rem"}}>
			<div>
				{/* Movie Title */}
				<h3 className="card-title text-center fs-5">{truncateText(title, 45)}</h3>

				{/* Movie Details */}
				<div className="details d-flex flex-column gap-2 text-center mt-5">
					<span>
						<span className="fa-solid fa-clock mx-2 main-color" aria-hidden="true"></span>
						{date}
					</span>
					<span>
						<span className="fa-solid fa-user main-color mx-2" aria-hidden="true"></span>
						{vote_count}
					</span>
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
DesktopDescription.displayName = "DesktopDescription";

// PropTypes Validation
DesktopDescription.propTypes = {
    title: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    vote_count: propTypes.number.isRequired,
    rate: propTypes.number.isRequired,
}

export default DesktopDescription;
