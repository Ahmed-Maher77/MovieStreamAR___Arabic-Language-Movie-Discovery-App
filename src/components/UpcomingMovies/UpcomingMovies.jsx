import { useTranslation } from "react-i18next";
import useFetchUpcomingMovies from "../../utils/api/useFetchUpcomingMovies";
import Section_LoadingState from "../Section_LoadingState/Section_LoadingState";
import Section_ErrorState from "../Section_ErrorState/Section_ErrorState";
import Section_Heading from "../Home/Section_Heading/Section_Heading";
import Section_MoviesContainer from "../Home/Section_MoviesContainer/Section_MoviesContainer";
import { useRef, useState } from "react";
import "../TrendingMovies/TrendingMovies.css";

const UpcomingMovies = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useFetchUpcomingMovies(1);
	const swiperRef = useRef(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

    if (isLoading) {
        return <Section_LoadingState title={t("loading_upcoming")} />;
    }

	const handleSwiper = (swiper) => {
		swiperRef.current = swiper;
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
	};

	const handleSlideChange = (swiper) => {
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
	};

	if (error) {
		return (
			<Section_ErrorState
				msg={t("error_upcoming")}
				error={error}
			/>
		);
	}

	return (
		<section className="trending-movies upcoming-movies py-5" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}>
			<div className="container">
				<Section_Heading
					title={t("upcoming_movies")}
					sliderControls={{
						prev: () => swiperRef.current?.slidePrev(),
						next: () => swiperRef.current?.slideNext(),
						isPrevDisabled: isBeginning,
						isNextDisabled: isEnd,
					}}
				/>
                
				<Section_MoviesContainer
					movies={data.results}
					swiperRef={swiperRef}
					onSwiper={handleSwiper}
					onSlideChange={handleSlideChange}
				/>
			</div>
		</section>
	);
};

export default UpcomingMovies;
