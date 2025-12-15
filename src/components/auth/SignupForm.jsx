import { useState } from "react";
import MaterialInput from "./MaterialInput";

export default function SignupForm({ onBack }) {
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSignup = () => {
        if (status !== "idle") return;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setErrorMsg("이메일 형식이 올바르지 않습니다.");
            setStatus("error");
            setTimeout(() => setStatus("idle"), 600);
            return;
        }

        if (!email || !password || !confirm) {
            setErrorMsg("모든 항목을 입력해주세요.");
            setStatus("error");
            setTimeout(() => setStatus("idle"), 600);
            return;
        }

        if (password !== confirm) {
            setErrorMsg("비밀번호가 서로 일치하지 않습니다.");
            setStatus("error");
            setTimeout(() => setStatus("idle"), 600);
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        setTimeout(() => {
            const success = true;

            if (success) {
                localStorage.setItem(
                    "userAccount",
                    JSON.stringify({ email, password })
                );

                setStatus("success");
                setTimeout(() => {
                    onBack();
                }, 600);
            } else {
                setStatus("error");
                setErrorMsg("회원가입에 실패했습니다.");
                setTimeout(() => setStatus("idle"), 600);
            }
        }, 1200);
    };

    return (
        <>
            <h2>Sign Up</h2>

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

            <MaterialInput
                label="Confirm Password"
                type="password"
                value={confirm}
                onChange={setConfirm}
            />

            {errorMsg && <div className="error-message">{errorMsg}</div>}

            <button
                className={`primary ${status}`}
                onClick={handleSignup}
            >
                {status === "idle" && "CREATE ACCOUNT"}
                {status === "loading" && <span className="loader" />}
                {status === "success" && "✓"}
                {status === "error" && "CREATE ACCOUNT"}
            </button>

            <button className="link" onClick={onBack}>
                BACK TO SIGN IN
            </button>
        </>
    );
}
