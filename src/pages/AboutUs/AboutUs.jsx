import { memo } from "react";
import "./AboutUs.css";
import HeroSection from "../../components/AboutUs/HeroSection";
import ProfessionalOverview from "../../components/AboutUs/ProfessionalOverview";
import ValueProposition from "../../components/AboutUs/ValueProposition";
import ContactHub from "../../components/AboutUs/ContactHub";
import CallToAction from "../../components/AboutUs/CallToAction";

const AboutUs = () => {
	return (
		<div className="about-page-wrapper" dir="rtl">
			<HeroSection />
			<ProfessionalOverview />
			<ValueProposition />
			<ContactHub />
			<CallToAction />
		</div>
	);
};

export default memo(AboutUs);
