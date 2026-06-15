# System Operations & User Flows — MovieStreamAR

> A comprehensive guide to the system architecture, component interactions, data flows, and user workflows.

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Component Architecture](#2-component-architecture)
3. [Data Flow Architecture](#3-data-flow-architecture)
4. [User Flows](#4-user-flows)
   - [4.1 Authentication Flow](#41-authentication-flow)
   - [4.2 Movie & TV Series Browsing Flow](#42-movie--tv-series-browsing-flow)
   - [4.3 Search Flow](#43-search-flow)
   - [4.4 Movie Details Viewing Flow](#44-movie-details-viewing-flow)
   - [4.5 Watchlist Management Flow](#45-watchlist-management-flow)
   - [4.6 Language Switching Flow](#46-language-switching-flow)
   - [4.7 Contact Form Flow](#47-contact-form-flow)
5. [State Management Architecture](#5-state-management-architecture)
6. [Route Structure](#6-route-structure)
7. [Firestore Data Model & Operations](#7-firestore-data-model--operations)

---

## 1. System Architecture Overview

MovieStreamAR follows a **hybrid architecture** combining:

- **Client-side rendering (CSR)** via React 19 with Vite as the build tool
- **Server state management** via TanStack React Query (TMDB API data with caching)
- **Client state management** via Redux Toolkit (auth, UI state, search queries)
- **Backend-as-a-Service** via Firebase (Authentication + Firestore for watchlist persistence)
- **Third-party services** via TMDB API (movie/TV data), EmailJS (contact form)

### High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "Client Browser"
        A[User Interface]
        B[React 19 + Vite]
        C[React Router v7]
        D[Redux Toolkit Store]
        E[React Query Cache]
        F[Framer Motion]
        G[i18next]
    end

    subgraph "External Services"
        H[TMDB API]
        I[Firebase Auth]
        J[Firebase Firestore]
        K[EmailJS]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    B --> F
    B --> G
    E --> H
    D --> I
    D --> J
    A --> K
```

### Layer Breakdown

| Layer | Technology | Responsibility |
|---|---|---|
| **Presentation** | React 19, Framer Motion, Swiper, Bootstrap 5 | Rendering UI, animations, responsive layout, hero carousels |
| **Routing** | React Router v7 | Client-side navigation, nested layouts, lazy loading, search params |
| **State (Client)** | Redux Toolkit (5 slices) | Auth state, search queries, window properties, watchlist data |
| **State (Server)** | TanStack React Query v5 | TMDB API data fetching, caching, refetching, staleTime management |
| **API Layer** | Axios, Firebase SDK | HTTP requests to TMDB, Firestore CRUD, Firebase Auth |
| **External** | TMDB, Firebase, EmailJS | Movie/TV data, authentication, database, email notifications |

---

## 2. Component Architecture

### React Component Tree

```mermaid
graph TB
    APP[App.jsx]
    APP --> RP[Redux Provider]
    APP --> AP[AuthProvider]
    APP --> TW[ToastWrapper]
    APP --> ROUTER[RouterProvider]
    
    ROUTER --> LAYOUT[Layout.jsx]
    LAYOUT --> NB[NavBar]
    LAYOUT --> OUTLET[Outlet]
    LAYOUT --> FOOTER[Footer]
    
    OUTLET --> HOME[Home.jsx]
    OUTLET --> MOVIES[MoviesList.jsx]
    OUTLET --> DETAILS[MoviesDetails.jsx]
    OUTLET --> TV[TVSeries_Page.jsx]
    OUTLET --> WL[Watchlist.jsx]
    OUTLET --> PROFILE[Profile.jsx]
    OUTLET --> ABOUT[AboutUs.jsx]
    OUTLET --> NF[NotFound.jsx]
    
    HOME --> SLIDER[Slider]
    HOME --> TM[TrendingMovies]
    HOME --> UM[UpcomingMovies]
    HOME --> ABOUTSEC[AboutUsSection]
    HOME --> CONTACT[ContactForm]
    
    NB --> LOGO[Logo]
    NB --> NL[NavLinks]
    NB --> SB[SearchBar]
    NB --> LS[LanguageSwitcher]
    NB --> LB[LoginButton / Profile_Dropdown]
    
    MOVIES --> MC[MovieCard]
    MOVIES --> PAG[Pagination]
    
    DETAILS --> MC2[MovieContent]
    DETAILS --> WB[WatchlistButton]
    DETAILS --> SM[SimilarMovies]
    
    WL --> WMC[Watchlist MovieCard]
    WL --> TB[ToggleBar]
    WL --> ESTATE[EmptyState / ErrorState / LoadingState]
```

### Key Component Responsibilities

| Component | Responsibility |
|---|---|
| **App.jsx** | Root: initializes Redux Provider, AuthProvider, ToastWrapper, creates router |
| **Layout.jsx** | Shared shell: renders NavBar, Footer, scroll-to-top, window resize listener, page direction sync |
| **NavBar** | Navigation, search bar, language switcher, auth buttons, profile dropdown, mobile burger menu |
| **Slider** | Hero carousel with Swiper.js, Framer Motion captions, auto-play, RTL support |
| **AuthProvider** | Firebase `onAuthStateChanged` listener, redirect result handling, pending movie processing |
| **RequireAuth** | Route guard: shows MainLoader during auth check, login prompt if unauthenticated |
| **MovieCard** | Reusable card with responsive desktop/mobile descriptions, hover overlay, keyboard navigation |

---

## 3. Data Flow Architecture

### Data Flow Diagram

```mermaid
flowchart LR
    subgraph "Data Sources"
        TMDB[(TMDB API)]
        FS[(Firebase Firestore)]
        FA[(Firebase Auth)]
        EJ[(EmailJS)]
    end
    
    subgraph "Data Layer"
        RQ[React Query Cache]
        RX[Redux Store]
    end
    
    subgraph "Custom Hooks"
        UFM[useFetchMovie]
        UFAM[useFetchAllMovies]
        UFTR[useFetchTrendingMovies]
        UFSM[useFetchSimilarMovies]
        UFUP[useFetchUpcomingMovies]
        UFTV[useFetchTvSeries]
        USM[useSearchMovies]
        USTV[useSearchTvSeries]
        UWL[useWatchlist]
        UGL[useGoogleLogin]
    end
    
    subgraph "Components"
        PAGES[Page Components]
        UI[UI Components]
    end
    
    TMDB --> RQ
    RQ --> UFM & UFAM & UFTR & UFSM & UFUP & UFTV & USM & USTV
    UFM & UFAM & UFTR & UFSM & UFUP & UFTV & USM & USTV --> PAGES
    
    FA --> UGL
    UGL --> PAGES
    
    FS --> UWL
    UWL --> RX
    RX --> PAGES
    
    EJ --> CONTACT[ContactForm]
    CONTACT --> PAGES
    
    PAGES --> UI
```

### Data Flow for a Typical Page Load (e.g., Movies List)

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Router as React Router
    participant Component as MoviesList
    participant RQ as React Query
    participant TMDB as TMDB API
    participant Redux as Redux Store

    User->>Browser: Navigate to /movies?page=1
    Browser->>Router: URL change
    Router->>Component: Render MoviesList
    Component->>Redux: Read search query
    Component->>RQ: useFetchAllMovies(page=1)
    RQ->>RQ: Check cache
    alt Cache miss
        RQ->>TMDB: GET /movie/popular?page=1
        TMDB-->>RQ: Return movie data
        RQ->>RQ: Cache response (staleTime: 10min)
    end
    RQ-->>Component: Return {data, isLoading, error}
    Component->>Component: Render movies grid or loader
    Component->>Component: Sync URL search param to Redux
```

---

## 4. User Flows

### 4.1 Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Page Component
    participant Auth as AuthProvider
    participant FA as Firebase Auth
    participant Redux as Redux Store
    participant FS as Firebase Firestore

    Note over User,FS: Login Flow
    User->>UI: Click "Login with Google"
    UI->>FA: signInWithPopup(auth, provider)
    FA-->>UI: Return user credential
    UI->>Auth: Toast success
    Auth->>FA: onAuthStateChanged trigger
    FA-->>Auth: Return user object
    Auth->>Redux: dispatch(setIsAuth(true))
    Auth->>Redux: dispatch(setUserData({uid, name, email, photoURL}))
    Auth->>Redux: dispatch(fetchWatchlist({userId, name, email}))
    Redux->>FS: getUserWatchlist(userId)
    FS-->>Redux: Return watchlist array
    Redux->>Redux: Store watchlist in state
    Auth->>Auth: Check sessionStorage for pendingMovie
    alt Pending movie exists
        Auth->>Redux: dispatch(addToWatchlist(movie))
        Redux->>FS: addToWatchlist(userId, movie)
        Auth->>Auth: Remove pendingMovie from sessionStorage
        Auth->>UI: Toast "Added to watchlist"
    end

    Note over User,FS: Logout Flow
    User->>UI: Click "Logout"
    UI->>FA: signOut()
    FA-->>UI: Success
    Auth->>Redux: dispatch(setIsAuth(false))
    Auth->>Redux: dispatch(setUserData(null))
    Redux->>Redux: Clear auth state
    UI->>User: Redirect to home
```

### 4.2 Movie & TV Series Browsing Flow

```mermaid
sequenceDiagram
    actor User
    participant NB as NavBar
    participant Router as React Router
    participant Page as MoviesList / TVSeries_Page
    participant RQ as React Query
    participant TMDB as TMDB API

    User->>NB: Click "Movies" link
    NB->>Router: Navigate to /movies
    Router->>Page: Render MoviesList
    Page->>Page: Read URL search params (?page=1, ?search=)
    Page->>RQ: useFetchAllMovies(page=1)
    RQ->>TMDB: GET /movie/popular?page=1
    TMDB-->>RQ: Return paginated results
    RQ-->>Page: {data, isLoading, error}
    
    alt Loading
        Page->>User: Show Loader spinner
    else Error
        Page->>User: Show error message
    else Success
        Page->>User: Render movie cards grid
    end

    User->>Page: Click page 2
    Page->>Router: Update URL to /movies?page=2
    Router->>Page: Re-render with page=2
    Page->>RQ: useFetchAllMovies(page=2)
    RQ->>TMDB: GET /movie/popular?page=2
    TMDB-->>RQ: Return page 2 results
    RQ-->>Page: Update data
    Page->>User: Render page 2 movies
```

### 4.3 Search Flow

```mermaid
sequenceDiagram
    actor User
    participant NB as NavBar
    participant Redux as Redux Store
    participant Router as React Router
    participant Page as MoviesList
    participant RQ as React Query
    participant TMDB as TMDB API

    User->>NB: Type in search bar
    NB->>Redux: dispatch(setSearchByValue(value))
    NB->>Router: navigate(/movies?search=value)
    Router->>Page: Re-render with search param
    Page->>Page: Read urlSearch from URL
    
    alt urlSearch is truthy
        Page->>RQ: useSearchMovies(urlSearch)
        RQ->>TMDB: GET /search/movie?query=value
        TMDB-->>RQ: Return search results
        RQ-->>Page: searchedMovies data
        Page->>Page: Display search results (no pagination)
    else urlSearch is empty
        Page->>RQ: useFetchAllMovies(page)
        Page->>Page: Display paginated popular movies
    end
    
    Page->>User: Render filtered results
    User->>User: Share URL /movies?search=value
    Note over User,TMDB: Search query is in URL → shareable/bookmarkable
```

### 4.4 Movie Details Viewing Flow

```mermaid
sequenceDiagram
    actor User
    participant Card as MovieCard
    participant Router as React Router
    participant Page as MoviesDetails
    participant RQ as React Query
    participant TMDB as TMDB API
    participant Redux as Redux Store
    participant FS as Firebase Firestore

    User->>Card: Click on movie card
    Card->>Router: navigate(/movies/:id, {state: {from}})
    Router->>Page: Render MoviesDetails with :id param
    
    Page->>Page: Determine comingFrom from state or URL path
    
    Page->>RQ: useFetchMovie(id, comingFrom)
    RQ->>TMDB: GET /movie/:id (primary)
    alt Primary fails
        RQ->>TMDB: GET /tv/:id (fallback)
    end
    TMDB-->>RQ: Return movie data + credits
    RQ-->>Page: {data, isLoading, error}
    
    Page->>Page: Detect media type (movie vs TV)
    Page->>Document: set document.title
    
    Page->>RQ: useFetchSimilarMovies(type, 1, id)
    RQ->>TMDB: GET /movie/:id/similar or /tv/:id/recommendations
    TMDB-->>RQ: Return similar movies
    RQ-->>Page: Similar movies data
    
    alt Authenticated
        Page->>Redux: Check watchlist for movie status
        Page->>User: Show WatchlistButton (add/remove)
    else Not authenticated
        Page->>User: Show WatchlistButton → opens LoginModal
    end
    
    User->>Page: Click "Add to Watchlist"
    alt Not authenticated
        Page->>sessionStorage: Store pendingMovie
        Page->>Page: Open LoginModal
        User->>Page: Login via Google
        Page->>AuthProvider: Auth state changes
        AuthProvider->>FS: Process pending movie
    else Authenticated
        Page->>Redux: dispatch(addToWatchlist(...))
        Redux->>FS: addToWatchlist(userId, movie)
        Page->>User: Toast "Added to watchlist"
    end
    
    Page->>User: Render movie details, poster, metadata, similar movies
```

### 4.5 Watchlist Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading: Navigate to /watchlist
    Loading --> Empty: Watchlist is empty
    Loading --> Display: Movies exist
    Loading --> Error: Fetch failed
    
    Display --> Filtered: Toggle Watched/Unwatched
    Filtered --> Display: Toggle back
    
    Display --> Removing: Click "Remove"
    Removing --> Display: Movie removed + toast
    
    Display --> Toggling: Click "Toggle Watched"
    Toggling --> Display: Status updated + toast
    
    Filtered --> Removing: Click "Remove"
    Removing --> Filtered: Movie removed
    
    Filtered --> Toggling: Click "Toggle Watched"
    Toggling --> Filtered: Status updated
    
    Empty --> [*]: Navigate away
    Display --> [*]: Navigate away
    Error --> [*]: Navigate away

```

```mermaid
sequenceDiagram
    actor User
    participant Page as Watchlist
    participant Hook as useWatchlist
    participant Redux as Redux Store
    participant FS as Firebase Firestore

    Note over User,FS: On page load
    Page->>Redux: Read watchlist from store (preloaded by AuthProvider)
    Redux-->>Page: watchlist items array
    Page->>Page: Filter by showWatched state
    Page->>User: Render filtered cards

    Note over User,FS: Remove movie
    User->>Page: Click "Remove" button
    Page->>Page: setRemovingId(movieId)
    Page->>Hook: removeMovie(movieId)
    Hook->>Redux: dispatch(removeFromWatchlist({userId, movieId}))
    Redux->>FS: removeFromWatchlist(userId, movieId)
    FS-->>Redux: Success
    Redux->>Redux: Filter out movie from state
    Redux-->>Page: State updated
    Page->>Page: setRemovingId(null)
    Page->>User: Toast "Removed from watchlist"

    Note over User,FS: Toggle watched status
    User->>Page: Click "Toggle Watched" button
    Page->>Page: setTogglingWatchedId(movieId)
    Page->>Hook: toggleWatched(movieId, !currentStatus)
    Hook->>Redux: dispatch(updateMovieStatus({userId, movieId, isWatched}))
    Redux->>FS: updateMovieStatus(userId, movieId, isWatched)
    FS-->>Redux: Success
    Redux->>Redux: Update movie.isWatched in state
    Redux-->>Page: State updated
    Page->>Page: setTogglingWatchedId(null)
```

### 4.6 Language Switching Flow

```mermaid
sequenceDiagram
    actor User
    participant NB as LanguageSwitcher
    participant i18n as i18next
    participant DOM as Document
    participant Redux as Redux Store
    participant RQ as React Query

    User->>NB: Click language flag (Arabic / English)
    NB->>i18n: changeLanguage('ar' or 'en')
    i18n->>i18n: Update language
    i18n->>localStorage: Persist language preference
    i18n->>DOM: Set <html lang="ar" dir="rtl">
    i18n->>DOM: Update body direction
    i18n->>Redux: dispatch(setPageDirection('rtl' or 'ltr'))
    
    Note over RQ: React Query invalidates all TMDB queries
    RQ->>RQ: Refetch with new langParam
    
    Note over NB,Redux: All UI components re-render with new translations
    NB->>NB: Toast notifications become RTL-aware
```

### 4.7 Contact Form Flow

```mermaid
sequenceDiagram
    actor User
    participant Form as ContactForm
    participant EJ as EmailJS
    participant Toast as Toast Notification

    User->>Form: Fill in name, email, subject, message
    User->>Form: Click "Send"
    Form->>Form: setSubmitting(true)
    Form->>EJ: sendForm(serviceId, ownerTemplateId, form)
    EJ-->>Form: Owner email sent
    Form->>EJ: sendForm(serviceId, userTemplateId, form)
    EJ-->>Form: User confirmation email sent
    Form->>Form: setSubmitting(false)
    Form->>Form: Reset form fields
    alt Success
        Form->>Toast: Show success message (RTL-aware)
    else Error
        Form->>Toast: Show error message
    end
    Toast->>User: Toast notification
```

---

## 5. State Management Architecture

### Redux Store Structure

```mermaid
graph TB
    STORE[Redux Store]
    STORE --> AUTH[authSlice]
    STORE --> WL[watchlistSlice]
    STORE --> SM[searchMovies_Slice]
    STORE --> STV[searchTvSeries_Slice]
    STORE --> WP[windowSlice]
    
    AUTH --> A1[authLoading: boolean]
    AUTH --> A2[isAuth: boolean]
    AUTH --> A3[userData: {uid, displayName, email, photoURL, emailVerified}]
    
    WL --> W1[items: array]
    WL --> W2[loading: boolean]
    WL --> W3[error: string | null]
    WL --> W4[Async Thunks: fetchWatchlist, addToWatchlist, removeFromWatchlist, updateMovieStatus]
    
    SM --> S1[searchByValue: string]
    STV --> S2[searchByValue: string]
    
    WP --> P1[isLargeScreen: boolean]
    WP --> P2[page_direction: 'rtl' | 'ltr']
```

### React Query Cache Structure

```mermaid
graph LR
    QC[QueryClient Cache]
    QC --> Q1[["movies", page, lang]]
    QC --> Q2[["movie", id, lang]]
    QC --> Q3[["similar_movies", page, id, limit, lang]]
    QC --> Q4[["trending_movies", page, lang]]
    QC --> Q5[["tv_series", page, lang]]
    QC --> Q6[["upcoming_movies", page, lang]]
    QC --> Q7[["searched_movies", query, lang]]
    QC --> Q8[["searched_tvseries", query, lang]]
    
    Q1 --> S1[staleTime: 600000]
    Q2 --> S2[staleTime: 10000]
    Q3 --> S3[staleTime: 600000]
    Q4 --> S4[staleTime: 600000]
    Q5 --> S5[staleTime: 600000]
    Q6 --> S6[staleTime: 600000]
    Q7 --> S7[staleTime: 600000]
    Q8 --> S8[staleTime: 600000]
```

### State vs. Server Data Decision Flow

```mermaid
flowchart TD
    DATA{What type of data?}
    DATA -->|TMDB Movie/TV data| SERVER[Use React Query]
    DATA -->|User auth state| AUTH[Use Redux authSlice]
    DATA -->|Watchlist items| WL[Use Redux watchlistSlice]
    DATA -->|Search query text| SQ[Use Redux searchMovies_Slice or searchTvSeries_Slice]
    DATA -->|UI state (screen size, direction)| UI[Use Redux windowSlice]
    
    SERVER --> CACHE[Cache with staleTime]
    SERVER --> REFETCH[Auto-refetch on language change]
    SERVER --> PLACEHOLDER[Keep previous data during refetch]
    
    WL --> PERSIST[Sync with Firebase Firestore]
    WL --> ASYNC[Use createAsyncThunk for CRUD]
    
    SQ --> URL[Sync with URL search params]
```

---

## 6. Route Structure

```mermaid
graph TB
    APP[App.jsx - Router]
    APP --> LAYOUT[Layout.jsx]
    
    LAYOUT --> HOME["/ - Home.jsx"]
    LAYOUT --> MOVIES["/movies - MoviesList.jsx (lazy)"]
    LAYOUT --> MDETAILS["/movies/:id - MoviesDetails.jsx (lazy)"]
    LAYOUT --> TV["/tv-series - TVSeries_Page.jsx (lazy)"]
    LAYOUT --> TVDETAILS["/tv-series/:id - MoviesDetails.jsx (lazy)"]
    LAYOUT --> PROFILE["/profile - Profile.jsx (RequireAuth)"]
    LAYOUT --> WL["/watchlist - Watchlist.jsx (lazy + RequireAuth)"]
    LAYOUT --> ABOUT["/about-us - AboutUs.jsx (lazy)"]
    LAYOUT --> NF["/* - NotFound.jsx (lazy)"]
    
    PROFILE --> RA1[RequireAuth Gate]
    WL --> RA2[RequireAuth Gate]
    
    RA1 --> AUTHCHECK{Is authenticated?}
    AUTHCHECK -->|Loading| LOADER[MainLoader]
    AUTHCHECK -->|No| LOGIN[Login Prompt]
    AUTHCHECK -->|Yes| PROFILEPAGE[Profile Component]
```

### Route Table

| Path | Component | Lazy? | Auth Required | Notes |
|---|---|---|---|---|
| `/` | Home | No | No | Hero slider, trending, upcoming, about, contact |
| `/movies` | MoviesList | Yes | No | Paginated grid, search via `?search=` |
| `/movies/:id` | MoviesDetails | Yes | No | Also handles `/tv-series/:id` via fallback |
| `/tv-series` | TVSeries_Page | Yes | No | Same pattern as MoviesList |
| `/tv-series/:id` | MoviesDetails | Yes | No | Same component as movies, detects TV |
| `/profile` | Profile | No | Yes | User info, logout |
| `/watchlist` | Watchlist | Yes | Yes | Watched/unwatched filter |
| `/about-us` | AboutUs | Yes | No | Developer info, values, contact |
| `*` | NotFound | Yes | No | 404 catch-all |

---

## 7. Firestore Data Model & Operations

### Database Schema

```mermaid
erDiagram
    USERS ||--o{ WATCHLIST_ITEM : contains
    USERS {
        string uid PK "Firebase Auth UID"
        string name "User display name"
        string email "User email address"
    }
    WATCHLIST_ITEM {
        string id "TMDB movie ID (string)"
        string title "Movie/TV title"
        string poster_path "TMDB poster path"
        boolean isWatched "Watch status"
    }
```

### Firestore CRUD Operation Details

| Operation | Firestore Method | Description |
|---|---|---|
| **Get Watchlist** | `getDoc(doc(db, "users", userId))` | Reads user document; auto-creates if not exists with `setDoc` |
| **Add Movie** | `arrayUnion(movie)` on `watchlist` field | Appends movie object to array |
| **Remove Movie** | `arrayRemove(movieObject)` on `watchlist` field | Finds exact object match and removes |
| **Toggle Status** | `updateDoc` with mapped array | Reads full array, maps to update target movie, writes back |

### Firestore Document Example

```json
{
  "users": {
    "abc123uid789": {
      "name": "Ahmed Maher",
      "email": "ahmed@example.com",
      "watchlist": [
        {
          "id": "550",
          "title": "Fight Club",
          "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
          "isWatched": false
        },
        {
          "id": "680",
          "title": "Pulp Fiction",
          "poster_path": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
          "isWatched": true
        }
      ]
    }
  }
}
```

---

## Appendix: System Operation Logging

The application includes debug logging (removable) at key system points:

| Location | Log Event | Data Logged |
|---|---|---|
| `Layout.jsx` | Route change | Pathname, search, timestamp |
| `MoviesDetails.jsx` | Component lifecycle | Mount/unmount, id, comingFrom |
| `MoviesDetails.jsx` | Data fetch status | Loading/loaded/error states |
| `MoviesList.jsx` | Component lifecycle | Mount/unmount |
| `TVSeries_Page.jsx` | Component lifecycle | Mount/unmount |

---

*Document generated from codebase analysis — reflects the current implementation of MovieStreamAR v0.0.0*
