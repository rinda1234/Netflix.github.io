import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true" ||
        localStorage.getItem("keepLogin") === "true";

    const user = JSON.parse(localStorage.getItem("userAccount"));

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("keepLogin");
        navigate("/signin");
    };

    if (!isLoggedIn) return null;

    return (
        <header className="app-header">
            <h1 className="logo" onClick={() => navigate("/")}>
                MyApp
            </h1>

            <nav className="nav-menu">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/popular">Popular</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
            </nav>

            <span className="user-email">
                {user?.email}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
                LOGOUT
            </button>
        </header>
    );
}
