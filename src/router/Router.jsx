import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";

import Home from "../pages/Home";
import Popular from "../pages/Popular";
import Search from "../pages/Search";
import Wishlist from "../pages/Wishlist";
import SigninPage from "../pages/SigninPage";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/Header";

export default function AppRouter() {
    const location = useLocation();
    const nodeRef = useRef(null); // ⭐ 핵심

    return (
        <>
            <Header />

            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.pathname}
                    classNames="page"
                    timeout={300}
                    nodeRef={nodeRef}   // ⭐ 핵심
                >
                    <div ref={nodeRef} className="page-wrapper">
                        <Routes location={location}>
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
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}
