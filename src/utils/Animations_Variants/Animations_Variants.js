// ================= Home Page: =================
export const homePageVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

// ================= MoviesDetails Page: =================
export const moviesDetailsPageVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

// ================= MoviesList Page: =================
export const moviesListPageVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

// ================= MovieCard Component: =================
export const movieCardVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

// ================= Section_MovieCard Component: =================
export const Section_MovieCardVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

// ================= Slider Component: =================
export const HomeSliderPosterVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};
export const HomeSliderHeadingVariants = {
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};
export const HomeSliderInfoVariants = {
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};
