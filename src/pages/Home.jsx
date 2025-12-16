import { useEffect, useMemo, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/home.css";
import useWishlist from "../hooks/useWishlist";

function Row({ title, movies, wishlist, onToggle, loading }) {
    return (
        <section className="row">
            <div className="row-head">
                <h2 className="row-title">{title}</h2>
                {loading && <span className="row-loading">Loading...</span>}
            </div>

            <div className="row-track">
                {movies.map((movie) => {
                    const liked = wishlist.some((m) => m.id === movie.id);
                    return (
                        <div
                            key={movie.id}
                            className={`poster-card ${liked ? "liked" : ""}`}
                            onClick={() => onToggle(movie)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onToggle(movie);
                            }}
                            title={movie.title}
                        >
                            <div className="poster-wrap">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="poster-fallback">No Image</div>
                                )}
                            </div>

                            <div className="poster-meta">
                                <div className="poster-title">{movie.title}</div>
                                <div className="poster-sub">
                                    {movie.release_date || "—"}
                                    <span className="dot">•</span>
                                    ⭐ {movie.vote_average?.toFixed?.(1) ?? "—"}
                                </div>
                            </div>

                            <div className="like-badge" aria-label="wishlist">
                                {liked ? "✓" : "+"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default function Home() {
    const { wishlist, toggleWishlist } = useWishlist();

    // ✅ Home에서 4개 API 호출 (필수 충족)
    const [rows, setRows] = useState({
        nowPlaying: { title: "Now Playing", movies: [], loading: true },
        popular: { title: "Popular", movies: [], loading: true },
        topRated: { title: "Top Rated", movies: [], loading: true },
        upcoming: { title: "Upcoming", movies: [], loading: true },
    });

    const anyLoading = useMemo(() => {
        return Object.values(rows).some((r) => r.loading);
    }, [rows]);

    useEffect(() => {
        let alive = true;

        const fetchRow = async (key, endpoint) => {
            try {
                const res = await tmdb.get(endpoint);
                if (!alive) return;

                const results = res.data?.results || [];
                setRows((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], movies: results, loading: false },
                }));
            } catch (e) {
                console.error(e);
                if (!alive) return;
                setRows((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], movies: [], loading: false },
                }));
            }
        };

        // ✅ 4개 endpoint (과제 필수)
        fetchRow("nowPlaying", "/movie/now_playing");
        fetchRow("popular", "/movie/popular");
        fetchRow("topRated", "/movie/top_rated");
        fetchRow("upcoming", "/movie/upcoming");

        return () => {
            alive = false;
        };
    }, []);

    // Hero(상단 배너) — nowPlaying 첫 영화로 구성
    const heroMovie = rows.nowPlaying.movies?.[0];

    return (
        <div className="home">
            {/* 🎬 HERO */}
            <div className="hero">
                <div
                    className="hero-bg"
                    style={{
                        backgroundImage: heroMovie?.backdrop_path
                            ? `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
                            : "none",
                    }}
                />
                <div className="hero-overlay" />

                <div className="hero-content">
                    <div className="hero-badge">HOME</div>
                    <h1 className="hero-title">
                        {heroMovie?.title || "Welcome"}
                    </h1>
                    <p className="hero-desc">
                        {heroMovie?.overview
                            ? heroMovie.overview
                            : "Pick a movie you like. Click a poster to add it to your wishlist."}
                    </p>

                    <div className="hero-actions">
                        <button
                            className="hero-btn primary"
                            onClick={() => {
                                if (heroMovie) toggleWishlist(heroMovie);
                            }}
                            disabled={!heroMovie}
                        >
                            {heroMovie && wishlist.some((m) => m.id === heroMovie.id)
                                ? "✓ In Wishlist"
                                : "+ Add to Wishlist"}
                        </button>

                        <button
                            className="hero-btn ghost"
                            onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}
                        >
                            Browse Rows
                        </button>
                    </div>

                    {anyLoading && (
                        <div className="hero-loading">Fetching movies…</div>
                    )}
                </div>
            </div>

            {/* 🎞️ ROWS */}
            <div className="home-rows">
                <Row
                    title={rows.nowPlaying.title}
                    movies={rows.nowPlaying.movies}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                    loading={rows.nowPlaying.loading}
                />
                <Row
                    title={rows.popular.title}
                    movies={rows.popular.movies}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                    loading={rows.popular.loading}
                />
                <Row
                    title={rows.topRated.title}
                    movies={rows.topRated.movies}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                    loading={rows.topRated.loading}
                />
                <Row
                    title={rows.upcoming.title}
                    movies={rows.upcoming.movies}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                    loading={rows.upcoming.loading}
                />
            </div>
        </div>
    );
}
