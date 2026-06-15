/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import "./Profile_Dropdown.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Tooltip from "../../Tooltip/Tooltip";

const Profile_Dropdown = () => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const userImage = useSelector((state) => state.auth.userData?.photoURL);
	const isProfilePage = useLocation().pathname === "/profile";
	const isLargeScreen = useSelector((state) => state.window_properties.isLargeScreen);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// const handleItemClick = () => setIsOpen(false);

	return (
		<div
			className="Profile_Dropdown dropdown tooltip-container"
			ref={dropdownRef}
			onClick={() => navigate("/profile")}
		>
			<figure onClick={toggleDropdown}>
				{userImage ? (
					<img src={userImage} alt={`picture`} className="main-border rounded-circle" />
				) : (
					<div className="profile-icon">M</div>
				)}
				<span className={isProfilePage ? "active" : ""}>{t("my_account")}</span>
			</figure>
			<Tooltip content={t("go_to_profile")} direction={isLargeScreen ? "right" : "left-near"} />

			{/* {isOpen && (
				<div className="dropdown-menu">
					<div className="dropdown-item" onClick={handleItemClick}>
						<span className="icon">👤</span> Profile
					</div>
					<div className="dropdown-item" onClick={handleItemClick}>
						<span className="icon">👤</span> My account
					</div>
					<div className="dropdown-divider" />
					<div className="dropdown-item" onClick={handleItemClick}>
						<span className="icon">➕</span> Add another account
					</div>
					<div className="dropdown-item" onClick={handleItemClick}>
						<span className="icon">⚙️</span> Settings
					</div>
					<div className="dropdown-item" onClick={handleItemClick}>
						<span className="icon">🔓</span> Logout
					</div>
				</div>
			)} */}
		</div>
	);
};

export default Profile_Dropdown;
