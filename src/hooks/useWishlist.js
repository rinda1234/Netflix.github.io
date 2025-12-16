import { useEffect, useState } from "react";

export default function useWishlist() {
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

    const isWishlisted = (id) => {
        return wishlist.some((m) => m.id === id);
    };

    return {
        wishlist,
        toggleWishlist,
        isWishlisted,
    };
}
