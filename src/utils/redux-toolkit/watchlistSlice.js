import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { watchlistService } from "../api/watchlist-service";

// Async thunks
export const fetchWatchlist = createAsyncThunk(
	"watchlist/fetchWatchlist",
	async ({ userId, name, email }) => {
		const watchlist = await watchlistService.getUserWatchlist(userId, name, email);
		return watchlist;
	}
);

export const addToWatchlist = createAsyncThunk(
	"watchlist/addToWatchlist",
	async ({ userId, movie, name, email }) => {
		await watchlistService.addToWatchlist(userId, movie, name, email);
		return movie;
	}
);

export const removeFromWatchlist = createAsyncThunk(
	"watchlist/removeFromWatchlist",
	async ({ userId, movieId }) => {
		await watchlistService.removeFromWatchlist(userId, movieId);
		return movieId;
	}
);

export const updateMovieStatus = createAsyncThunk(
	"watchlist/updateMovieStatus",
	async ({ userId, movieId, isWatched }) => {
		await watchlistService.updateMovieStatus(userId, movieId, isWatched);
		return { movieId, isWatched };
	}
);

const watchlistSlice = createSlice({
	name: "watchlist",
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearWatchlist: (state) => {
			state.items = [];
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch watchlist
			.addCase(fetchWatchlist.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchWatchlist.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchWatchlist.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Add to watchlist
			.addCase(addToWatchlist.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(addToWatchlist.rejected, (state, action) => {
				state.error = action.error.message;
			})
			// Remove from watchlist
			.addCase(removeFromWatchlist.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(movie) => movie.id !== action.payload
				);
			})
			.addCase(removeFromWatchlist.rejected, (state, action) => {
				state.error = action.error.message;
			})
			// Update movie status
			.addCase(updateMovieStatus.fulfilled, (state, action) => {
				const { movieId, isWatched } = action.payload;
				const movie = state.items.find((movie) => movie.id === movieId);
				if (movie) {
					movie.isWatched = isWatched;
				}
			})
			.addCase(updateMovieStatus.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export const { clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
