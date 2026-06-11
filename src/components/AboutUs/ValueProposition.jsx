import { motion } from "framer-motion";

const values = [
	{
		title: "كود نظيف وقابل للتطوير",
		description: "كتابة شفرات برمجية منظمة، موثقة، وسهلة الصيانة والتطوير مستقبلاً بما يتوافق مع أفضل المعايير الهندسية.",
		icon: "fa-solid fa-laptop-code",
	},
	{
		title: "أداء فائق للسرعة",
		description: "تحسين سرعة التحميل واستهلاك الموارد لضمان تجربة مستخدم سلسة حتى في ظل ظروف الاتصال الضعيفة.",
		icon: "fa-solid fa-gauge-high",
	},
	{
		title: "معمارية قابلة للتوسع",
		description: "تصميم أنظمة قادرة على استيعاب نمو عدد المستخدمين والبيانات بكفاءة عالية وبدون اختناقات.",
		icon: "fa-solid fa-network-wired",
	},
	{
		title: "تصميم متمحور حول المستخدم",
		description: "بناء واجهات جذابة وتفاعلية تضع تجربة المستخدم (UX) في المقام الأول لتحقيق أعلى معدلات التفاعل.",
		icon: "fa-solid fa-pen-nib",
	},
	{
		title: "حل المشكلات المعقدة",
		description: "تحليل المتطلبات الصعبة وتقديم حلول تقنية ذكية ومبتكرة تتجاوز التوقعات.",
		icon: "fa-solid fa-puzzle-piece",
	},
	{
		title: "تطوير موجه للأعمال",
		description: "ربط التقنية بأهداف البزنس لضمان أن كل ميزة برمجية تساهم في نمو المشروع وزيادة العوائد.",
		icon: "fa-solid fa-chart-line",
	},
];

const ValueProposition = () => {
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
						القيمة المضافة
					</h2>
					<h3 className="section-title-large text-white mb-4">
						لماذا يجب أن نعمل معاً؟
					</h3>
					<p className="text-muted-custom fs-5">
						أقدم مزيجاً فريداً بين الفهم العميق للبزنس والاحترافية التقنية لبناء منتجات تنجح في السوق.
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
