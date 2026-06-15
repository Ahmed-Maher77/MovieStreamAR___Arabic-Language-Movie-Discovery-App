# 🎬 MovieStreamAR — Arabic Movie & TV Series Discovery Platform

A modern bilingual (Arabic/English) movie and TV series discovery web app. Browse trending and upcoming films, search with shareable URLs, view detailed metadata, manage a personal watchlist with watched/unwatched tracking, and explore similar content — all with a responsive RTL-aware UI, smooth animations, and persistent authentication.

---

## 🌐**Demo (Live Preview):** 
**🔗 Live Preview:** [https://movie-discovery-app-gamma.vercel.app/](https://movie-discovery-app-gamma.vercel.app/)

---

## 👀 Website Preview:
<a href="https://movie-discovery-app-gamma.vercel.app" title="demo">
  <img src="https://github.com/user-attachments/assets/3df5deff-bb65-411c-a3d9-b05de7e2019e" alt="website preview - Demo - UI Mockup" width="400">
</a>

---

## ✨ Key Features

### Browsing & Discovery
- **Hero Slider** — Full-screen Swiper carousel with autoplay, bilingual slide data, Framer Motion staggered captions, random order on each visit, RTL gradient support
- **Movies & TV Series** — Fetch popular lists from TMDB API with paginated grids (up to 500 pages), responsive columns (1–5 per row)
- **Search** — Real-time search synced to URL query params (`?search=query`), making results shareable and bookmarkable. Separate search state for movies and TV series
- **Movie/TV Details** — Dual media support (auto-detects movies vs TV series), fallback API endpoints, poster with overlay, full metadata (rating, vote count, release date, runtime, country, genres, languages), overview/story, homepage link
- **Similar Content** — Similar movies or TV recommendations with "Show More/Less" pagination (5 items per batch), star rating converted from TMDB score, click-to-navigate

### Watchlist & Authentication
- **Google Sign-In** — Firebase Authentication with `signInWithPopup`, persistent auth state via `onAuthStateChanged`, redirect result handling
- **Personal Watchlist** — Add/remove movies, toggle watched/unwatched status, filter by status via pill toggle (with counts)
- **Firebase Firestore Sync** — Real-time persistence using `arrayUnion`/`arrayRemove`, user document auto-creation on first interaction
- **Pending Movies** — Stores movie in `sessionStorage` for unauthenticated users; auto-processes on login

### User Experience
- **Bilingual Interface** — Instant Arabic/English toggle via i18next, persisted to `localStorage`, dynamic RTL/LTR direction, all UI adapts (gradients, toasts, buttons, flex, borders, border-radius)
- **Responsive Design** — Bootstrap 5 grid, Swiper breakpoints (1–6 slides), mobile/desktop split descriptions, collapsible navbar, `clamp()` typography
- **Animations** — Framer Motion page transitions (fade in), scroll-triggered staggered children, card hover effects, hero caption animations, AnimatedScrollToTop on page change
- **Toast Notifications** — react-toastify for all user actions (watchlist changes, login/logout, contact form, errors), RTL-aware
- **Contact Form** — EmailJS integration: sends message to owner + confirmation email to user, loading spinner, success/error toasts
- **404 Page** — Friendly error page with "Back to Home" navigation

### Profile & About
- **Profile Page** — View avatar, display name with email verified badge, email with copy-to-clipboard, UID with copy, logout
- **About Us Page** — Animated hero, professional overview cards, value proposition grid (6 cards), contact hub (Email, LinkedIn, GitHub, WhatsApp), call-to-action
- **Home About Section** — Developer profile image, features list, "Learn More" CTA

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | UI library (component-based architecture) |
| **React Router v7** | Client-side routing (nested layouts, dynamic params, search params, lazy loading) |
| **Redux Toolkit** | Centralized state (auth, search queries, window properties, watchlist with async thunks) |
| **TanStack React Query v5** | Server state management (TMDB API caching, staleTime, placeholder data, auto-refetch) |
| **Axios** | HTTP client for TMDB REST API |
| **Firebase Auth** | Google sign-in authentication |
| **Firebase Firestore** | NoSQL database (per-user watchlist documents) |
| **Framer Motion** | Page transitions, scroll-triggered staggered animations, card entrance effects |
| **i18next + react-i18next** | Full internationalization (Arabic/English, localStorage persistence, RTL) |
| **Bootstrap 5** | Responsive grid, navbar collapse, utilities, components |
| **Swiper 11** | Touch carousels (hero slider, trending, upcoming sections) |
| **Vite 6 + SWC** | Build tool with fast refresh, HMR, optimized production builds |
| **react-toastify** | Toast notifications for all user actions |
| **EmailJS** | Serverless email from contact form (owner + user confirmation) |
| **react-intersection-observer** | Triggers scroll-based staggered animations |
| **Font Awesome + Bootstrap Icons** | Icon libraries |

---

## 🚀 Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Ahmed-Maher77/MovieApp___Arabic-Movie-Discovery-App.git
cd MovieApp___Arabic-Movie-Discovery-App

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory with:
VITE_API_KEY=your_tmdb_api_key
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_FIREBASE_AUTHDOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECTID=your_firebase_project_id
VITE_FIREBASE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGESENDERID=your_firebase_messaging_sender_id
VITE_FIREBASE_APPID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENTID=your_firebase_measurement_id
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_OWNER_TEMPLATE_ID=your_emailjs_owner_template_id
VITE_EMAILJS_USER_TEMPLATE_ID=your_emailjs_user_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# 4. Start development server
npm run dev          # → http://localhost:5173

# 5. Build for production
npm run build        # → dist/

# 6. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── main.jsx                     # Entry: QueryClientProvider, Bootstrap, i18n
├── App.jsx                      # Root: Redux Provider, AuthProvider, Router + lazy routes
├── i18n.js                      # i18next config (Arabic/English, localStorage, RTL)
│
├── common/
│   ├── AnimatedScrollToTop.jsx  # Smooth scroll-to-top on route change
│   └── Authentication/
│       ├── AuthProvider.jsx     # Firebase auth observer + pending movie handler
│       └── RequireAuth.jsx      # Route guard for authenticated pages
│
├── components/                  # Reusable UI (grouped by feature)
│   ├── AboutUs/                 # HeroSection, ProfessionalOverview, ValueProposition, ContactHub, CTA
│   ├── ContactForm/             # EmailJS form (owner + user confirmation)
│   ├── Footer/                  # Brand, navigation, language switcher, social, copyright
│   ├── Home/                    # Section_Heading, Section_MovieCard, Section_MoviesContainer
│   ├── Loader/                  # Animated SVG loader + MainLoader wrapper
│   ├── LoginModal/              # Google login modal overlay
│   ├── MovieCard/               # Reusable card (desktop hover + mobile bottom overlay)
│   ├── NavBar/                  # Logo, links, search, language switcher, auth, profile, burger menu
│   ├── Profile/                 # ProfileAvatar, ProfileInfo, ProfileActions
│   ├── Slider/                  # Hero Swiper slider + captions + controls + slide data
│   ├── StarRating/              # 5-star display from 10-point TMDB rating
│   ├── TrendingMovies/          # Trending movies section (fetches + Swiper)
│   ├── UpcomingMovies/          # Upcoming movies section (fetches + Swiper)
│   └── Watchlist/               # MovieCard, ToggleBar, EmptyState, ErrorState, LoadingState
│
├── hooks/
│   ├── useGoogleLogin.js        # Firebase Google sign-in popup
│   └── useWatchlist.js          # Watchlist CRUD (add, remove, toggle, check status)
│
├── pages/
│   ├── Home.jsx                 # Slider + Trending + Upcoming + About + Contact
│   ├── Layout.jsx               # NavBar + Outlet + Footer + resize listener
│   ├── NotFound.jsx             # 404 page
│   ├── AboutUs/                 # Full about page (hero, overview, values, contact, CTA)
│   ├── MoviesDetails/           # Movie/TV details (poster, metadata, story, watchlist, similar)
│   ├── MoviesList/              # Movie grid (search + pagination + cards)
│   ├── Profile/                 # User profile card
│   ├── TVSeries/                # TV series grid (search + pagination + cards)
│   └── Watchlist/               # Filtered watchlist with toggle bar
│
└── utils/
    ├── Animations_Variants/     # Framer Motion variants (page transitions, cards, slider)
    ├── api/
    │   ├── firebase-config.js   # Firebase init (auth, db, analytics, provider)
    │   ├── watchlist-service.js # Firestore CRUD (get, add, remove, toggle status)
    │   ├── useFetchAllMovies.js # React Query: GET /movie/popular
    │   ├── useFetchMovie.js     # React Query: GET /movie/:id or /tv/:id (with fallback)
    │   ├── useFetchSimilarMovies.js # React Query: GET /movie/:id/similar or /tv/:id/recommendations
    │   ├── useFetchTrendingMovies.js # React Query: GET /trending/movie/week
    │   ├── useFetchTvSeries.js  # React Query: GET /tv/popular
    │   ├── useFetchUpcomingMovies.js # React Query: GET /movie/upcoming
    │   ├── useSearchMovies.js   # React Query: GET /search/movie
    │   └── useSearchTvSeries.js # React Query: GET /search/tv
    └── redux-toolkit/
        ├── store.js             # Redux store (5 slices)
        ├── authSlice.js         # Auth state + user data
        ├── watchlistSlice.js    # Watchlist state + async thunks
        ├── searchMovies_Slice.js
        ├── searchTvSeries_Slice.js
        └── windowSlice.js       # isLargeScreen + page_direction
```

---

## 🗄️ Database Structure (Firebase Firestore)

**Collection:** `users` — Document ID: Firebase UID

```json
{
  "name": "User Display Name",
  "email": "user@example.com",
  "watchlist": [
    {
      "id": "550",
      "title": "Fight Club",
      "poster_path": "/...",
      "isWatched": false
    }
  ]
}
```

**Operations:** `arrayUnion` (add), `arrayRemove` (remove), map-and-write (toggle status)

---

## 📡 API Endpoints (TMDB via React Query)

| Hook | Endpoint | Stale Time | Notes |
|---|---|---|---|
| `useFetchAllMovies(page)` | `GET /movie/popular` | 10 min | Placeholder keeps previous data |
| `useFetchMovie(id, from)` | `GET /movie/:id` or `/tv/:id` | 10 sec | Falls back to alternate on error |
| `useFetchSimilarMovies(type, page, id)` | `GET /movie/:id/similar` or `/tv/:id/recommendations` | 10 min | Optional result limit |
| `useFetchTrendingMovies(page)` | `GET /trending/movie/week` | 10 min | Placeholder |
| `useFetchTvSeries(page)` | `GET /tv/popular` | 10 min | Placeholder |
| `useFetchUpcomingMovies(page)` | `GET /movie/upcoming` | 10 min | Placeholder |
| `useSearchMovies(query)` | `GET /search/movie` | 10 min | Enabled only when query is truthy |
| `useSearchTvSeries(query)` | `GET /search/tv` | 10 min | Enabled only when query is truthy |

---

## ✅ Best Practices Implemented

**Performance:** Code splitting (React.lazy + Suspense), memoization (React.memo, useCallback, useMemo), React Query staleTime (10 min) + placeholder data, URL-based pagination (`?page=N`), search params (`?search=query`) for shareable/bookmarkable URLs, SWC fast refresh

**Security:** Environment variables for all API keys, `rel="noopener noreferrer"` on external links, `encodeURIComponent` on search queries, React's default XSS escaping

**Accessibility:** ARIA labels on all interactive elements, `aria-live="polite"` on loaders, `role="status"`/`role="alert"`/`role="search"`, semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`), keyboard navigation (tabIndex + onKeyDown), screen-reader text (`.visually-hidden`)

**SEO:** Comprehensive OG/Twitter Card meta tags, canonical URL, JSON-LD structured data (WebApplication + BreadcrumbList), robots.txt, sitemap.xml, dynamic `document.title`, proper heading hierarchy

**UX:** Per-component loading/error/empty states, toast feedback for all actions, pending movie handling for unauthenticated users, language persistence to localStorage, 404 recovery page

**Architecture:** Single Responsibility components, separation of concerns (API layer / state layer / UI layer), DRY via reusable generic components, PropTypes validation, custom hooks for encapsulated logic

---

## 📬 Contact

- **Portfolio:** [https://ahmedmaher-portfolio.vercel.app/](https://ahmedmaher-portfolio.vercel.app/)
- **LinkedIn:** [https://www.linkedin.com/in/ahmed-maher-algohary](https://www.linkedin.com/in/ahmed-maher-algohary)
- **Email:** [ahmedmaher.dev1@gmail.com](mailto:ahmedmaher.dev1@gmail.com)
- **GitHub:** [https://github.com/Ahmed-Maher77](https://github.com/Ahmed-Maher77)

---

> Contributions, issues, and feature requests are welcome. Please open an issue or submit a pull request.
