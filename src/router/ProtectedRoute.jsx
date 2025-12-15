import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true" ||
        localStorage.getItem("keepLogin") === "true";


    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}
