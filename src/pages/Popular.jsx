import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "../styles/popular.css";

export default function Popular() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [viewMode, setViewMode] = useState("infinite"); // infinite | table
    const [currentPage, setCurrentPage] = useState(1);

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
       API FETCH
    ========================= */
    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);
            try {
                const res = await tmdb.get("/movie/popular", {
                    params: { page: viewMode === "infinite" ? page : currentPage },
                });

                setTotalPages(res.data.total_pages);

                if (viewMode === "infinite") {
                    setMovies((prev) => {
                        const ids = new Set(prev.map((m) => m.id));
                        const filtered = res.data.results.filter(
                            (m) => !ids.has(m.id)
                        );
                        return [...prev, ...filtered];
                    });
                } else {
                    setMovies(res.data.results);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [page, currentPage, viewMode]);

    /* =========================
       Infinite Scroll
    ========================= */
    useEffect(() => {
        if (viewMode !== "infinite") return;

        const onScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (nearBottom && !loading && page < totalPages) {
                setPage((p) => p + 1);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loading, page, totalPages, viewMode]);

    /* =========================
       Scroll Lock (Table View)
    ========================= */
    useEffect(() => {
        if (viewMode === "table") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [viewMode]);

    /* =========================
       Top Button
    ========================= */
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="page popular-page">
            <div className="popular-header">
                <h2>🔥 Popular Movies</h2>

                <div className="view-toggle">
                    <button
                        className={viewMode === "infinite" ? "active" : ""}
                        onClick={() => {
                            setMovies([]);
                            setPage(1);
                            setViewMode("infinite");
                        }}
                    >
                        Infinite View
                    </button>
                    <button
                        className={viewMode === "table" ? "active" : ""}
                        onClick={() => {
                            setCurrentPage(1);
                            setViewMode("table");
                        }}
                    >
                        Table View
                    </button>
                </div>
            </div>

            {/* Movie Grid */}
            <div className={`movie-grid ${viewMode}`}>
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

            {/* Pagination (Table View only) */}
            {viewMode === "table" && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && <div className="loading">Loading...</div>}

            {/* Top Button */}
            <button className="top-btn" onClick={scrollTop}>
                ↑ TOP
            </button>
        </div>
    );
}
