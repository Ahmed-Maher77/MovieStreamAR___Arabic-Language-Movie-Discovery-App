import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProfessionalOverview = () => {
	const { t } = useTranslation();
	return (
		<section className="w-100 py-5 position-relative" style={{ zIndex: 10 }}>
			<div className="container mt-5">
				<motion.div 
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="w-100 text-center mx-auto"
					style={{ maxWidth: "800px" }}
				>
					<h2 className="section-subtitle">
						{t("professional_subtitle")}
					</h2>
					<h3 className="section-title-large text-white">
						{t("professional_title")}
					</h3>
				</motion.div>

				<div className="row mt-5 g-4">
					{/* Story Card */}
					<motion.div 
						className="col-lg-6"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="glass-card">
							<div className="icon-wrapper">
								<i className="fa-solid fa-graduation-cap"></i>
							</div>
							<h4 className="fs-3 fw-bold text-white mb-4">{t("professional_academic_title")}</h4>
							<p className="text-muted-custom fs-5">
								{t("professional_academic_desc")}
							</p>
						</div>
					</motion.div>

					{/* Engineering Mindset Card */}
					<motion.div 
						className="col-lg-6"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="glass-card">
							<div className="icon-wrapper">
								<i className="fa-solid fa-layer-group"></i>
							</div>
							<h4 className="fs-3 fw-bold text-white mb-4">{t("professional_scalable_title")}</h4>
							<p className="text-muted-custom fs-5">
								{t("professional_scalable_desc")}
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ProfessionalOverview;
