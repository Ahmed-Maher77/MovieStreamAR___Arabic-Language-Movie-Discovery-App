import propTypes from "prop-types";
import i18n from "../../i18n";

const formatList = (list, key) => {
	if (!list?.length) {
		return i18n.t("not_available");
	}
	return list.map((item) => item[key]).join(" ⦁ ");
};

formatList.propTypes = {
	list: propTypes.arrayOf(propTypes.object).isRequired,
	key: propTypes.string.isRequired,
};

export default formatList;
