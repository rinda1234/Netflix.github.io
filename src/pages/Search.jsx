import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/search.css";

export default function Search() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const [loading, setLoading] = useState(false);

    // filters
    const [keyword, setKeyword] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState("popularity.desc");

    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const toggleWishlist = (movie) => {
        setWishlist((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            const updated = exists
                ? prev.filter((m) => m.id !== movie.id)
                : [...prev, movie];

            localStorage.setItem("wishlist", JSON.stringify(updated));
            return updated;
        });
    };

    /* =========================
       GENRES
    ========================= */
    useEffect(() => {
        tmdb.get("/genre/movie/list").then((res) => {
            setGenres(res.data.genres);
        });
    }, []);

    /* =========================
       SEARCH API
    ========================= */
    const searchMovies = async () => {
        setLoading(true);
        try {
            const res = await tmdb.get("/discover/movie", {
                params: {
                    with_genres: selectedGenre || undefined,
                    vote_average_gte: minRating || undefined,
                    sort_by: sort,
                },
            });

            const filtered = keyword
                ? res.data.results.filter((m) =>
                    m.title.toLowerCase().includes(keyword.toLowerCase())
                )
                : res.data.results;

            setMovies(filtered);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       RESET
    ========================= */
    const resetFilters = () => {
        setKeyword("");
        setSelectedGenre("");
        setMinRating(0);
        setSort("popularity.desc");
        setMovies([]);
    };

    return (
        <div className="page search-page">
            <h2>🔍 Search Movies</h2>

            {/* FILTER BAR */}
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search title..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                >
                    <option value={0}>All Ratings</option>
                    <option value={7}>⭐ 7+</option>
                    <option value={8}>⭐ 8+</option>
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="popularity.desc">Popularity</option>
                    <option value="release_date.desc">Latest</option>
                    <option value="vote_average.desc">Rating</option>
                </select>

                <button onClick={searchMovies}>Search</button>
                <button className="reset" onClick={resetFilters}>
                    Reset
                </button>
            </div>

            {/* RESULT */}
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
