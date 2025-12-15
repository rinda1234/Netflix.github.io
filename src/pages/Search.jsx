import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/search.css";

export default function Search() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const [sort, setSort] = useState("popularity"); // popularity | rating | release
    const [recent, setRecent] = useState(() => {
        return JSON.parse(localStorage.getItem("recentSearch")) || [];
    });

    // ❤️ 찜 토글
    const toggleWishlist = (movie) => {
        const exists = wishlist.find((m) => m.id === movie.id);
        const updated = exists
            ? wishlist.filter((m) => m.id !== movie.id)
            : [...wishlist, movie];

        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    // 🔍 검색 실행
    const handleSearch = async (q) => {
        if (!q.trim()) return;

        setLoading(true);
        setError(false);

        try {
            const res = await tmdb.get("/search/movie", {
                params: { query: q }
            });

            let results = res.data.results || [];

            // 정렬
            if (sort === "rating") {
                results.sort((a, b) => b.vote_average - a.vote_average);
            }
            if (sort === "release") {
                results.sort(
                    (a, b) =>
                        new Date(b.release_date) -
                        new Date(a.release_date)
                );
            }

            setMovies(results);

            // 최근 검색어 저장 (중복 제거, 최대 5개)
            const updatedRecent = [
                q,
                ...recent.filter((r) => r !== q)
            ].slice(0, 5);

            setRecent(updatedRecent);
            localStorage.setItem(
                "recentSearch",
                JSON.stringify(updatedRecent)
            );
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h2 className="page-title">🔍 Search Movies</h2>

            {/* 🔎 검색창 */}
            <div className="search-bar">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movie title..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch(query);
                    }}
                />
                <button onClick={() => handleSearch(query)}>
                    Search
                </button>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="release">Release Date</option>
                </select>
            </div>

            {/* 🕘 최근 검색어 */}
            {recent.length > 0 && (
                <div className="recent">
                    <span>Recent:</span>
                    {recent.map((r) => (
                        <button
                            key={r}
                            onClick={() => {
                                setQuery(r);
                                handleSearch(r);
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            )}

            {/* 상태 처리 */}
            {loading && <div className="loading">Loading...</div>}
            {error && (
                <div className="empty">
                    검색 결과를 불러오지 못했습니다 😢
                </div>
            )}

            {/* 🎬 검색 결과 */}
            <div className="movie-grid">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className={`movie-card ${
                            wishlist.some((m) => m.id === movie.id)
                                ? "liked"
                                : ""
                        }`}
                        onClick={() => toggleWishlist(movie)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
