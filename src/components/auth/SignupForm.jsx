import { useState } from "react";
import MaterialInput from "./MaterialInput";

export default function SignupForm({ onBack }) {
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");

    const handleSignup = () => {
        if (status !== "idle") return;

        setStatus("loading");
        setErrorMsg("");

        // 서버 요청 흉내
        setTimeout(() => {
            const success = true; // 테스트용: 성공(true) / 실패(false) 바꿔가며 확인

            if (success) {
                setStatus("success");

                // ✓ 잠깐 보여주고 로그인 화면으로 복귀
                setTimeout(() => {
                    setStatus("idle");
                    onBack(); // 👉 로그인 화면으로 전환
                }, 700);
            } else {
                setStatus("error");
                setErrorMsg("회원가입에 실패했습니다. 다시 시도해주세요.");

                // shake 끝나면 idle 복귀
                setTimeout(() => setStatus("idle"), 600);
            }
        }, 1200);
    };

    return (
        <>
            <h2>Sign Up</h2>

            <MaterialInput label="Email" />
            <MaterialInput label="Password" type="password" />
            <MaterialInput label="Confirm Password" type="password" />

            {/* 에러 메시지 */}
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
