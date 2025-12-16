import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/search.css";
import useWishlist from "../hooks/useWishlist";

export default function Search() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    /* filters */
    const [minRate, setMinRate] = useState(0);
    const [sort, setSort] = useState("popularity.desc");

    /* wishlist */
    const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

    /* search */
    const searchMovies = async () => {
        if (!query.trim()) return;

        setLoading(true);

        try {
            const res = await tmdb.get("/search/movie", {
                params: { query },
            });

            let results = res.data.results || [];

            // ⭐ 필터링
            results = results.filter(
                (m) => m.vote_average >= minRate
            );

            // ⭐ 정렬
            if (sort === "vote_average.desc") {
                results.sort((a, b) => b.vote_average - a.vote_average);
            } else {
                results.sort((a, b) => b.popularity - a.popularity);
            }

            setMovies(results);

            // ⭐ 최근 검색어 저장 (LocalStorage)
            const history =
                JSON.parse(localStorage.getItem("recentSearch")) || [];

            const updatedHistory = [
                query,
                ...history.filter((q) => q !== query),
            ].slice(0, 5);

            localStorage.setItem(
                "recentSearch",
                JSON.stringify(updatedHistory)
            );
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /* reset */
    const resetFilters = () => {
        setQuery("");
        setMovies([]);
        setMinRate(0);
        setSort("popularity.desc");
    };

    return (
        <div className="page search-page">
            <h2>🔍 Search Movies</h2>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    placeholder="Search movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") searchMovies();
                    }}
                />
                <button onClick={searchMovies}>Search</button>
            </div>

            {/* Filters */}
            <div className="filters">
                <label>
                    Min Rating:
                    <select
                        value={minRate}
                        onChange={(e) =>
                            setMinRate(Number(e.target.value))
                        }
                    >
                        <option value={0}>All</option>
                        <option value={5}>5+</option>
                        <option value={7}>7+</option>
                        <option value={8}>8+</option>
                    </select>
                </label>

                <label>
                    Sort:
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="popularity.desc">
                            Popularity
                        </option>
                        <option value="vote_average.desc">
                            Rating
                        </option>
                    </select>
                </label>

                <button className="reset-btn" onClick={resetFilters}>
                    Reset
                </button>
            </div>

            {/* Result */}
            {loading && <div className="loading">Loading...</div>}

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
