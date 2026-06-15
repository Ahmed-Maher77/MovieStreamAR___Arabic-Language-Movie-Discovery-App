import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ValueProposition = () => {
	const { t } = useTranslation();

	const values = [
		{
			title: t("value_code_title"),
			description: t("value_code_desc"),
			icon: "fa-solid fa-laptop-code",
		},
		{
			title: t("value_perf_title"),
			description: t("value_perf_desc"),
			icon: "fa-solid fa-gauge-high",
		},
		{
			title: t("value_scalable_title"),
			description: t("value_scalable_desc"),
			icon: "fa-solid fa-network-wired",
		},
		{
			title: t("value_ux_title"),
			description: t("value_ux_desc"),
			icon: "fa-solid fa-pen-nib",
		},
		{
			title: t("value_problem_title"),
			description: t("value_problem_desc"),
			icon: "fa-solid fa-puzzle-piece",
		},
		{
			title: t("value_business_title"),
			description: t("value_business_desc"),
			icon: "fa-solid fa-chart-line",
		},
	];

	return (
		<section className="w-100 py-5 position-relative" style={{ zIndex: 10 }}>
			<div className="container py-5">
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mx-auto mb-5"
					style={{ maxWidth: "700px" }}
				>
					<h2 className="section-subtitle">
						{t("value_subtitle")}
					</h2>
					<h3 className="section-title-large text-white mb-4">
						{t("value_title")}
					</h3>
					<p className="text-muted-custom fs-5">
						{t("value_desc")}
					</p>
				</motion.div>

				<div className="row g-4">
					{values.map((val, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="col-12 col-md-6 col-lg-4"
						>
							<div className="glass-card">
								<div className="icon-wrapper bg-gradient shadow-lg text-white" style={{ background: "linear-gradient(135deg, #bc6132 0%, #8c4623 100%)" }}>
									<i className={val.icon}></i>
								</div>
								<h4 className="text-white fs-4 fw-bold mb-3">{val.title}</h4>
								<p className="text-muted-custom mb-0">{val.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ValueProposition;
