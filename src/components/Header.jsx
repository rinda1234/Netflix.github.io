import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/signin");
    };

    if (!isLoggedIn) return null;

    return (
        <header className="app-header">
            <h1 className="logo">MyApp</h1>

            {/* 네비게이션 메뉴 */}
            <nav className="nav-menu">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/popular">
                    Popular
                </NavLink>
                <NavLink to="/search">
                    Search
                </NavLink>
                <NavLink to="/wishlist">
                    Wishlist
                </NavLink>
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
                LOGOUT
            </button>
        </header>
    );
}
