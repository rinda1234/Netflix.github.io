import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialInput from "./MaterialInput";

export default function LoginForm({ onSignup }) {
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSignIn = () => {
        if (status !== "idle") return;

        setStatus("loading");
        setErrorMsg("");

        // 서버 요청 흉내
        setTimeout(() => {
            const success = false; // ❗ 테스트용: 실패로 고정

            if (success) {
                localStorage.setItem("isLoggedIn", "true");
                setStatus("success");
                setTimeout(() => navigate("/"), 600);
            } else {
                setStatus("error");
                setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");

                // shake 애니메이션 끝나면 idle로 복귀
                setTimeout(() => {
                    setStatus("idle");
                }, 600);
            }
        }, 1200);
    };

    return (
        <>
            <h2>Sign In</h2>

            <MaterialInput label="Email" />
            <MaterialInput label="Password" type="password" />

            {/* 에러 메시지 */}
            {errorMsg && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}

            <button
                className={`primary ${status}`}
                onClick={handleSignIn}
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
