import { useEffect, useState } from "react";
import "../styles/wishlist.css";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
    }, []);

    const removeWishlist = (movie) => {
        const updated = wishlist.filter((m) => m.id !== movie.id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    if (wishlist.length === 0) {
        return (
            <div className="page">
                <div className="empty">
                    아직 찜한 영화가 없습니다 🎬
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <h2 className="page-title">❤️ My Wishlist</h2>

            <div className="wishlist-grid">
                {wishlist.map((movie) => (
                    <div
                        key={movie.id}
                        className="wishlist-card"
                        onClick={() => removeWishlist(movie)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="info">
                            <h3>{movie.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
