import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/popular.css";

export default function Popular() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);              // infinite용
    const [currentPage, setCurrentPage] = useState(1); // table용
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [viewMode, setViewMode] = useState("infinite"); // infinite | table

    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const toggleWishlist = (movie) => {
        const exists = wishlist.find((m) => m.id === movie.id);
        const updated = exists
            ? wishlist.filter((m) => m.id !== movie.id)
            : [...wishlist, movie];

        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    // 🔥 Popular API 호출 (viewMode 분기)
    useEffect(() => {
        const fetchPopular = async () => {
            if (loading) return;

            setLoading(true);
            try {
                const pageToLoad =
                    viewMode === "table" ? currentPage : page;

                const res = await tmdb.get("/movie/popular", {
                    params: { page: pageToLoad }
                });

                if (viewMode === "table") {
                    // Table View: 한 페이지씩 교체
                    setMovies(res.data.results);
                    setHasMore(currentPage < res.data.total_pages);
                } else {
                    // Infinite Scroll: 누적 + 중복 제거
                    setMovies((prev) => {
                        const ids = new Set(prev.map((m) => m.id));
                        const filtered = res.data.results.filter(
                            (m) => !ids.has(m.id)
                        );
                        return [...prev, ...filtered];
                    });
                    setHasMore(page < res.data.total_pages);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [page, currentPage, viewMode]);

    // 🔥 Infinite Scroll (infinite 모드일 때만)
    useEffect(() => {
        if (viewMode !== "infinite") return;

        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (bottom && !loading && hasMore) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, viewMode]);

    return (
        <div className="page">
            <h2 className="page-title">🔥 Popular Movies</h2>

            {/* 🔀 View 전환 버튼 */}
            <div className="view-toggle">
                <button
                    className={viewMode === "infinite" ? "active" : ""}
                    onClick={() => {
                        setViewMode("infinite");
                        setMovies([]);
                        setPage(1);
                    }}
                >
                    Infinite Scroll
                </button>

                <button
                    className={viewMode === "table" ? "active" : ""}
                    onClick={() => {
                        setViewMode("table");
                        setCurrentPage(1);
                    }}
                >
                    Table View
                </button>
            </div>

            {/* 🎬 Infinite Scroll View */}
            {viewMode === "infinite" && (
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
            )}

            {/* 📋 Table View */}
            {viewMode === "table" && (
                <>
                    <table className="movie-table">
                        <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Release</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie) => (
                            <tr
                                key={movie.id}
                                className={
                                    wishlist.some((m) => m.id === movie.id)
                                        ? "liked"
                                        : ""
                                }
                                onClick={() => toggleWishlist(movie)}
                            >
                                <td>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </td>
                                <td>{movie.title}</td>
                                <td>{movie.release_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* 📄 Pagination */}
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((p) => p - 1)
                            }
                        >
                            Prev
                        </button>

                        <span>{currentPage}</span>

                        <button
                            onClick={() =>
                                setCurrentPage((p) => p + 1)
                            }
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {loading && <div className="loading">Loading...</div>}
        </div>
    );
}
