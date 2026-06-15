import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CallToAction = () => {
	const { t } = useTranslation();
	return (
		<section className="w-100 py-5 position-relative overflow-hidden" style={{ zIndex: 10 }}>
			{/* Glow Background */}
			<div className="cta-gradient-bg"></div>
			
			<div className="container position-relative my-5">
				<motion.div 
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
					style={{ padding: "4rem 2rem" }}
				>
					<h2 className="display-5 fw-bold text-white mb-4">
						{t("cta_title1")} <br className="d-none d-md-block" />
						<span className="gradient-text">{t("cta_title2")}</span>
					</h2>
					<p className="fs-5 text-muted-custom mb-5 mx-auto" style={{ maxWidth: "650px" }}>
						{t("cta_desc")}
					</p>

					<div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 w-100">
						<a 
							href={`https://wa.me/+201150383416?text=${encodeURIComponent("مرحباً أحمد، لقد زرت موقعك الشخصي وأود التحدث معك بخصوص مشروع جديد.")}`}
							target="_blank"
							rel="noreferrer"
							className="btn btn-main fw-bold px-5 py-3 w-100 text-center"
							style={{ fontSize: "1.1rem", borderRadius: "12px", maxWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}
						>
							{t("cta_start_project")}
						</a>
						<a 
							href={`mailto:ahmedmaher.dev1@gmail.com?subject=${encodeURIComponent("تواصل بخصوص مشروع جديد")}&body=${encodeURIComponent("مرحباً أحمد،\n\nأود التحدث معك بخصوص تفاصيل مشروع جديد...\n\nتحياتي،")}`}
							className="btn text-white fw-bold px-5 py-3 w-100 text-center"
							style={{ 
								fontSize: "1.1rem", 
								borderRadius: "12px",
								maxWidth: "300px",
								background: "rgba(255, 255, 255, 0.05)",
								border: "1px solid rgba(255, 255, 255, 0.1)",
								backdropFilter: "blur(10px)",
								transition: "all 0.3s ease",
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
							onMouseOver={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
							onMouseOut={(e) => e.target.style.background = "rgba(255, 255, 255, 0.05)"}
						>
							{t("cta_send_email")}
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CallToAction;
