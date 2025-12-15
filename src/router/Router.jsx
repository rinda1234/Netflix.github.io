import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Popular from "../pages/Popular";
import Search from "../pages/Search";
import Wishlist from "../pages/Wishlist";
import SigninPage from "../pages/SigninPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/popular"
                    element={
                        <ProtectedRoute>
                            <Popular />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
