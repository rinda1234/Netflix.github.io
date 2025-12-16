import { useEffect, useState, useMemo } from "react";
import tmdb from "../api/tmdb";
import "../styles/popular.css";
import useWishlist from "../hooks/useWishlist";

const ITEMS_PER_PAGE = 12; // ⭐ Table View 기준 한 페이지 개수

export default function Popular() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [viewMode, setViewMode] = useState("infinite"); // infinite | table
    const [currentPage, setCurrentPage] = useState(1);

    const { toggleWishlist, isWishlisted } = useWishlist();

    /* =========================
       API FETCH
    ========================= */
    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);
            try {
                const res = await tmdb.get("/movie/popular", {
                    params: {
                        page: viewMode === "infinite" ? page : 1, // ⭐ Table View는 항상 page=1
                    },
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
                    setMovies(res.data.results); // ⭐ 한 페이지 데이터만 저장
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [page, viewMode]);

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
       Scroll Lock
    ========================= */
    useEffect(() => {
        document.body.style.overflow =
            viewMode === "table" ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [viewMode]);

    /* =========================
       Table View Slice
    ========================= */
    const tableMovies = useMemo(() => {
        if (viewMode !== "table") return movies;

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return movies.slice(start, end);
    }, [movies, currentPage, viewMode]);

    /* =========================
       UI
    ========================= */
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
                {(viewMode === "table" ? tableMovies : movies).map((movie) => (
                    <div
                        key={movie.id}
                        className={`movie-card ${
                            isWishlisted(movie.id) ? "liked" : ""
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
                    <span>Page {currentPage}</span>
                    <button
                        disabled={
                            currentPage * ITEMS_PER_PAGE >= movies.length
                        }
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {loading && <div className="loading">Loading...</div>}

            <button
                className="top-btn"
                onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }
            >
                ↑ TOP
            </button>
        </div>
    );
}
