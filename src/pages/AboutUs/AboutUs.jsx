import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./AboutUs.css";
import HeroSection from "../../components/AboutUs/HeroSection";
import ProfessionalOverview from "../../components/AboutUs/ProfessionalOverview";
import ValueProposition from "../../components/AboutUs/ValueProposition";
import ContactHub from "../../components/AboutUs/ContactHub";
import CallToAction from "../../components/AboutUs/CallToAction";

const AboutUs = () => {
	const { i18n } = useTranslation();
	const dir = i18n.language === "ar" ? "rtl" : "ltr";
	return (
		<div className="about-page-wrapper" dir={dir}>
			<HeroSection />
			<ProfessionalOverview />
			<ValueProposition />
			<ContactHub />
			<CallToAction />
		</div>
	);
};

export default memo(AboutUs);
