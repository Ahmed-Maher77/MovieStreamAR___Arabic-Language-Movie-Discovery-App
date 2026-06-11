import { NavLink } from "react-router-dom";

const GoBack_Btn = () => {
	return (
		<NavLink
			to={-1}
			type="button"
			className="GoBack_Btn btn btn-secondary d-flex align-items-center gap-3 justify-content-between fs-5 pb-2 w-100 my-3 mb-2 px-3"
		>
			رجوع
			<span className="fa-solid fa-arrow-left mt-1"></span>
		</NavLink>
	);
};

export default GoBack_Btn;
