import { motion } from "framer-motion";

const contactMethods = [
	{
		id: "email",
		title: "البريد الإلكتروني",
		value: "ahmedmaher.dev1@gmail.com",
		icon: "fa-solid fa-envelope",
		url: "mailto:ahmedmaher.dev1@gmail.com",
	},
	{
		id: "linkedin",
		title: "LinkedIn",
		value: "Ahmed Maher Algohary",
		icon: "fa-brands fa-linkedin-in",
		url: "https://www.linkedin.com/in/ahmed-maher-algohary",
	},
	{
		id: "github",
		title: "GitHub",
		value: "Ahmed-Maher77",
		icon: "fa-brands fa-github",
		url: "https://github.com/Ahmed-Maher77",
	},
	{
		id: "whatsapp",
		title: "WhatsApp",
		value: "+201150383416",
		icon: "fa-brands fa-whatsapp",
		url: "https://wa.me/+201150383416",
	},
];

const ContactHub = () => {
	return (
		<section id="contact" className="w-100 py-5 position-relative" style={{ zIndex: 10 }}>
			<div className="container py-5">
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-5"
				>
					<h2 className="display-6 fw-bold text-white mb-3">قنوات الاتصال</h2>
					<p className="text-muted-custom fs-5" style={{ maxWidth: "700px" }}>
						يمكنك التواصل معي عبر أي من القنوات التالية. أرد عادةً خلال ساعات العمل الرسمية.
					</p>
				</motion.div>

				<div className="row g-4">
					{contactMethods.map((method, index) => (
						<motion.div
							className="col-12 col-md-6 col-lg-3"
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
						>
							<a
								href={method.url}
								target="_blank"
								rel="noreferrer"
								className={`social-link-card flex-column align-items-start ${method.id}`}
							>
								<div className="icon-wrapper d-flex align-items-center justify-content-center bg-dark rounded-3" style={{ width: "60px", height: "60px" }}>
									<i className={`${method.icon} social-icon`}></i>
								</div>
								<div className="mt-3">
									<h4 className="text-white fw-bold fs-5 mb-2">{method.title}</h4>
									<p className="text-muted-custom small mb-0 text-truncate w-100" dir="ltr" style={{ maxWidth: "200px" }}>{method.value}</p>
								</div>
								
								<div className="mt-3 d-flex align-items-center fw-bold small" style={{ color: "var(--main-c)" }}>
									<span>تواصل الآن</span>
									<i className="fa-solid fa-arrow-left me-2"></i>
								</div>
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactHub;
