import PropTypes from "prop-types";

const FeaturesList = ({ features }) => {
	return (
		<ul className="features-list mb-4">
			{features.map((feature, index) => (
				<li key={index} className="feature-item">
					<div className="feature-icon">
						<i className={feature.icon}></i>
					</div>
					<span className="feature-title">{feature.title}</span>
				</li>
			))}
		</ul>
	);
};

FeaturesList.propTypes = {
	features: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default FeaturesList;
