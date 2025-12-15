import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Popular from "../pages/Popular";
import Search from "../pages/Search";
import Wishlist from "../pages/Wishlist";
import SigninPage from "../pages/SigninPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/search" element={<Search />} />
                <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
        </BrowserRouter>
    );
}
