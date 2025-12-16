import { useEffect, useState } from "react";
import "../styles/wishlist.css";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // ❗ API 호출 절대 없음 (과제 필수)
    useEffect(() => {
        const stored =
            JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
    }, []);

    const removeFromWishlist = (movie) => {
        const updated = wishlist.filter(
            (m) => m.id !== movie.id
        );
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    if (wishlist.length === 0) {
        return (
            <div className="page wishlist-page empty">
                <h2>💔 My Wishlist</h2>
                <p>No movies in your wishlist yet.</p>
                <span>
                    Click a movie card to add it to your wishlist.
                </span>
            </div>
        );
    }

    return (
        <div className="page wishlist-page">
            <h2>❤️ My Wishlist</h2>

            <div className="movie-grid">
                {wishlist.map((movie) => (
                    <div
                        key={movie.id}
                        className="movie-card liked"
                        onClick={() => removeFromWishlist(movie)}
                        title="Click to remove"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <span>Click to remove</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
