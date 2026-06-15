import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ToggleBar = ({
	showWatched,
	setShowWatched,
	watchedCount,
	notWatchedCount,
	styles,
}) => {
	const { t } = useTranslation();
	return (
		<div className={styles["modern-toggle-bar"] + " my-4"} style={{marginBottom: "10px"}}>
			<div className={styles["toggle-pill"]}>
				<button
					className={
						styles["toggle-btn"] +
						" " +
						styles.right +
						(showWatched ? " " + styles.active : "")
					}
					onClick={() => setShowWatched(true)}
					type="button"
				>
					{t("watched")}<span className={styles.count}>({watchedCount})</span>
				</button>
				<button
					className={
						styles["toggle-btn"] +
						" " +
						styles.left +
						(!showWatched ? " " + styles.active : "")
					}
					onClick={() => setShowWatched(false)}
					type="button"
				>
					{t("not_watched")} <span className={styles.count}>({notWatchedCount})</span>
				</button>
				<div
					className={
						styles["toggle-slider"] +
						(showWatched ? " " + styles.right : " " + styles.left)
					}
				></div>
			</div>
		</div>
	);
};

ToggleBar.propTypes = {
	showWatched: PropTypes.bool.isRequired,
	setShowWatched: PropTypes.func.isRequired,
	watchedCount: PropTypes.number.isRequired,
	notWatchedCount: PropTypes.number.isRequired,
	styles: PropTypes.object.isRequired,
};

export default ToggleBar;
