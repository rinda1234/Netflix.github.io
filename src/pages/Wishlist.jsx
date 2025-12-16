import "../styles/wishlist.css";
import useWishlist from "../hooks/useWishlist";

export default function Wishlist() {
    // ✅ Custom Hook 사용
    const { wishlist, toggleWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="page wishlist-page empty">
                <h2>💔 Wishlist</h2>
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
                        onClick={() => toggleWishlist(movie)}
                        title="Click to remove"
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
