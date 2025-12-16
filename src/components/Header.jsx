import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/header.css";

export default function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true" ||
        localStorage.getItem("keepLogin") === "true";

    // ✅ username 가져오기
    const username = localStorage.getItem("currentUser");

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("keepLogin");
        localStorage.removeItem("currentUser"); // ✅ 이것도 같이 제거
        navigate("/signin");
    };

    if (!isLoggedIn) return null;

    return (
        <header className={`app-header ${scrolled ? "scrolled" : ""}`}>
            <h1 className="logo" onClick={() => navigate("/")}>
                MyApp
            </h1>

            <nav className="nav-menu">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/popular">Popular</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
            </nav>

            {/* ✅ 여기 변경됨 */}
            <span className="user-email">
                {username}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
                LOGOUT
            </button>
        </header>
    );
}
