import { useTranslation } from "react-i18next";
import ProfileImage from "./ProfileImage";
import SectionTitle from "./SectionTitle";
import FeaturesList from "./FeaturesList";
import LearnMoreButton from "./LearnMoreButton";
import "./AboutUsSection.css";

const AboutUsSection = () => {
	const { t } = useTranslation();
	const features = [
		{ title: t("about_feature_web"), icon: "fa-solid fa-globe" },
		{ title: t("about_feature_mobile"), icon: "fa-solid fa-mobile-screen-button" },
		{ title: t("about_feature_desktop"), icon: "fa-solid fa-desktop" },
		{ title: t("about_feature_ui"), icon: "fa-solid fa-pen-nib" },
	];

	return (
		<section className="about-us-section py-5">
			<div className="container">
				<ProfileImage />
				<div className="about-content-container row align-items-center">
					<div className="mb-4 mb-lg-0">
						<div className="about-content">
							<SectionTitle title={t("about_title")} />
							<p className="mb-4">
								{t("about_desc1")}
							</p>
							<p className="mb-4">{t("about_desc2")}</p>
							<FeaturesList features={features} />
							<LearnMoreButton />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUsSection;
