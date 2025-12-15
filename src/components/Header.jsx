import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/signin");
    };

    return (
        <header className="app-header">
            <h1 className="logo">MyApp</h1>

            {isLoggedIn && (
                <button className="logout-btn" onClick={handleLogout}>
                    LOGOUT
                </button>
            )}
        </header>
    );
}
