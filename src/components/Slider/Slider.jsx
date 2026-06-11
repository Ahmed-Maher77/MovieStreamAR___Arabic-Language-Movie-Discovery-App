import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SliderCaption from "./SliderCaption";
import { HomeSliderPosterVariants } from "../../utils/Animations_Variants/Animations_Variants";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { randomSlides as slidesData } from "./slidesData";


const Slider = () => {
	const navigate = useNavigate();

	return (
		<div
			className="hero-slider"
			style={{
				height: "calc(100vh - 64px)",
				minHeight: "630px",
				maxHeight: "900px",
			}}
		>
			<Swiper
				modules={[EffectFade, Autoplay, Navigation, Pagination]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				speed={1200}
				spaceBetween={0}
				slidesPerView={1}
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
				}}
				className="hero-swiper"
			>
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
										linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 70%),
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
					</SwiperSlide>
					);
				})}

				{/* Pagination */}
				<div className="swiper-pagination"></div>
			</Swiper>
		</div>
	);
};

export default memo(Slider);
