import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import "../styles/auth.css";

export default function SigninPage() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="auth-container">
            <div className="auth-card">
                {isSignup ? (
                    <SignupForm onBack={() => setIsSignup(false)} />
                ) : (
                    <LoginForm onSignup={() => setIsSignup(true)} />
                )}
            </div>
        </div>
    );
}
