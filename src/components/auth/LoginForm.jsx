import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialInput from "./MaterialInput";

export default function LoginForm({ onSignup }) {
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setErrorMsg("이메일 형식이 올바르지 않습니다.");
            setStatus("error");
            return;
        }

        const storedUser = JSON.parse(
            localStorage.getItem("userAccount")
        );

        if (
            !storedUser ||
            storedUser.email !== email ||
            storedUser.password !== password
        ) {
            setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
            setStatus("error");
            return;
        }

        // Remember me
        if (remember) {
            localStorage.setItem("keepLogin", "true");
        } else {
            localStorage.removeItem("keepLogin");
        }

        localStorage.setItem("isLoggedIn", "true");
        setStatus("success");

        setTimeout(() => {
            navigate("/");
        }, 600);
    };


    return (
        <>
            <h2>Sign In</h2>

            <MaterialInput
                label="Email"
                value={email}
                onChange={setEmail}
            />

            <MaterialInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
            />


            <label className="remember">
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
            </label>

            {/* 에러 메시지 */}
            {errorMsg && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}

            <button
                className={`primary ${status}`}
                onClick={handleLogin}

            >
                {status === "idle" && "SIGN IN"}
                {status === "loading" && <span className="loader" />}
                {status === "success" && "✓"}
                {status === "error" && "SIGN IN"}
            </button>

            <button className="link" onClick={onSignup}>
                SIGN UP
            </button>
        </>
    );
}
