import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import myPicture from "../../assets/My_Picture.png";

const HeroSection = () => {
	const page_direction = useSelector(
		(state) => state.window_properties?.page_direction
	) || 'rtl';
	const isRTL = page_direction === "rtl";

	return (
		<section className="position-relative w-100 overflow-hidden pt-5 pb-5">
			{/* Background Glow Effects */}
			<div className="hero-gradient-bg"></div>

			<div className="container hero-content">
				<div className="row align-items-center justify-content-between w-100">
					
					{/* Text Content */}
					<motion.div 
						className="col-lg-7 col-md-12 mb-5 lg-mb-0"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="hero-badge d-inline-flex align-items-center gap-2" dir="ltr">
							<i className="fa-solid fa-code" style={{ color: "var(--main-c)" }}></i>
							<span className="text-white">Full-Stack Developer</span>
						</div>
						
						<h1 className="display-3 fw-bold text-white mb-4">
							أحمد ماهر الجوهري
						</h1>
						
						<p className="fs-5 text-muted-custom mb-5" style={{ maxWidth: "600px", fontWeight: "300" }}>
							متخصص في بناء تطبيقات ويب عصرية، قابلة للتطوير، ومرتكزة على تقديم تجربة مستخدم استثنائية. من الواجهات الأمامية المذهلة إلى الأنظمة الخلفية القوية وحلول الذكاء الاصطناعي.
						</p>

						<div className="d-flex flex-wrap gap-3">
							<a 
								href="#contact" 
								className="btn btn-main fw-bold d-flex align-items-center gap-2"
								style={{ padding: "1rem 2rem", borderRadius: "12px" }}
							>
								<i className="fa-solid fa-paper-plane"></i>
								تواصل معي
							</a>
							<a 
								href="https://drive.google.com/file/d/16qSTe2NIRTjGSNb9lX-nZ5zGuJpsa84s/view?usp=sharing"
								target="_blank"
								rel="noreferrer"
								className="btn text-white fw-bold d-flex align-items-center gap-2 glass-card"
								style={{ padding: "1rem 2rem", borderRadius: "12px" }}
							>
								<i className="fa-solid fa-download"></i>
								تحميل السيرة الذاتية
							</a>
						</div>
					</motion.div>

					{/* Image Content */}
					<motion.div 
						className="col-lg-4 col-md-12 d-flex justify-content-center mt-5 mt-lg-0"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
					>
						<div className="position-relative hero-avatar-placeholder">
							<div className="position-relative w-100 h-100 overflow-hidden hero-avatar-blob">
								<img 
									src={myPicture} 
									alt="Ahmed Maher Algohary" 
									className="w-100 h-100"
									style={{ objectFit: "cover", objectPosition: "top center" }}
								/>
							</div>
							
							{/* Floating Badge */}
							<motion.div 
								animate={{ y: [0, -10, 0] }}
								transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
								className="position-absolute d-flex align-items-center gap-2 shadow-lg"
								style={{ 
									bottom: "30px", 
									left: "-30px", 
									padding: "0.75rem 1.5rem", 
									borderRadius: "50px", 
									background: "rgba(10, 10, 10, 0.85)",
									backdropFilter: "blur(10px)",
									WebkitBackdropFilter: "blur(10px)",
									border: "1px solid rgba(255, 255, 255, 0.12)",
									zIndex: 10
								}}
								dir="rtl"
							>
								<div className="position-relative d-flex justify-content-center align-items-center">
									<i className="fa-solid fa-briefcase" style={{ color: "#10b981", fontSize: "1.1rem" }}></i>
								</div>
								<span className="text-white fw-bold" style={{ fontSize: "0.95rem", letterSpacing: "0.5px" }}>متاح للعمل</span>
							</motion.div>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
};

export default HeroSection;
