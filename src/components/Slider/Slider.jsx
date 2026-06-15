import { useNavigate } from "react-router-dom";
import { memo, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import SliderCaption from "./SliderCaption";
import { HomeSliderPosterVariants } from "../../utils/Animations_Variants/Animations_Variants";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { slides as rawSlides } from "./slidesData";


const Slider = () => {
	const { i18n } = useTranslation();
	const navigate = useNavigate();
	const isRTL = i18n.language === "ar";
	const lang = i18n.language === "en" ? "en" : "ar";

	const orderRef = useRef(null);
	if (!orderRef.current) {
		orderRef.current = rawSlides.map((_, i) => i).sort(() => Math.random() - 0.5);
	}

	const slidesData = useMemo(() => 
		orderRef.current.map(i => ({
			id: rawSlides[i].id,
			poster: rawSlides[i].poster,
			title: rawSlides[i][lang].title,
			overview: rawSlides[i][lang].overview,
			rating: rawSlides[i].rating,
			view: rawSlides[i].view,
			poster_path: '/' + rawSlides[i].poster.split('/').pop(),
		})),
		[lang]
	);

	return (
		<div
			className="hero-slider"
			style={{
				height: "calc(100vh - 64px)",
				height: "calc(100vh - 64px)",
				minHeight: "630px",
				maxHeight: "900px",
			}}
		>
			<Swiper
				key={lang}
				modules={[EffectFade, Autoplay, Navigation, Pagination]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				speed={1200}
				fadeEffect={{ crossFade: true }}
				speed={1200}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				}}
				pagination={{
					clickable: true,
					el: ".swiper-pagination",
					dynamicBullets: true,
					dynamicBullets: true,
				}}
				className="hero-swiper"
			>
				{slidesData.map((movie, index) => {
					const bgUrl = movie.poster.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/original${movie.poster}`;
					return (
				{slidesData.map((movie, index) => {
					const bgUrl = movie.poster.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/original${movie.poster}`;
					return (
					<SwiperSlide key={index}>
						{({ isActive }) => (
							<div 
								className="slide-content"
								style={{
									backgroundImage: `
										linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 20%),
										linear-gradient(${isRTL ? "to left" : "to right"}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 70%),
										url(${bgUrl})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundAttachment: "fixed"
								}}
							>
								<div className="container h-100">
									<div className="row h-100 align-items-center">
										<div className="col-lg-8 col-md-10">
											<SliderCaption movie={movie} isActive={isActive} />
										</div>
									</div>
								</div>
							</div>
						)}
						)}
					</SwiperSlide>
					);
				})}
					);
				})}

				{/* Pagination */}
				<div className="swiper-pagination"></div>
			</Swiper>
		</div>
	);
};

export default memo(Slider);
