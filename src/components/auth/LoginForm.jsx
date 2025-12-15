import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialInput from "./MaterialInput";

export default function LoginForm({ onSignup }) {
    const [status, setStatus] = useState("idle"); // idle | loading | success
    const navigate = useNavigate();

    const handleSignIn = () => {
        if (status !== "idle") return;

        setStatus("loading");

        // 서버 요청 흉내
        setTimeout(() => {
            // ✅ 로그인 성공 처리
            localStorage.setItem("isLoggedIn", "true");

            setStatus("success");

            // ✅ 성공 애니메이션 잠깐 보여주고 이동
            setTimeout(() => {
                navigate("/");
            }, 600);
        }, 1500);
    };

    return (
        <>
            <h2>Sign In</h2>

            <MaterialInput label="Email" />
            <MaterialInput label="Password" type="password" />

            <button
                className={`primary ${status}`}
                onClick={handleSignIn}
            >
                {status === "idle" && "SIGN IN"}
                {status === "loading" && <span className="loader" />}
                {status === "success" && "✓"}
            </button>

            <button className="link" onClick={onSignup}>
                SIGN UP
            </button>
        </>
    );
}
