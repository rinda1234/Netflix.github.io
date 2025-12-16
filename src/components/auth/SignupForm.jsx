import { useState } from "react";
import MaterialInput from "./MaterialInput";
import { hashPassword } from "../../api/tmdbAuth";


export default function SignupForm({ onBack }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        if (!agree) {
            setError("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }

        if (!username || !email || !password) {
            setError("모든 항목을 입력해주세요.");
            return;
        }

        if (password !== confirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        if (users.some((u) => u.username === username)) {
            setError("이미 존재하는 아이디입니다.");
            return;
        }

        // 🔐 TMDB API를 이용한 비밀번호 처리
        const hashed = await hashPassword(password);

        users.push({
            username,
            email,
            password: hashed,
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("회원가입 성공!");
        onBack();
    };

    return (
        <>
            <h2>Sign Up</h2>

            <MaterialInput label="Username" value={username} onChange={setUsername} />
            <MaterialInput label="Email" value={email} onChange={setEmail} />
            <MaterialInput label="Password" type="password" value={password} onChange={setPassword} />
            <MaterialInput label="Confirm Password" type="password" value={confirm} onChange={setConfirm} />

            <label className="agree">
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                />
                약관에 동의합니다 (필수)
            </label>

            {error && <div className="error-message">{error}</div>}

            <button className="primary" onClick={handleSignup}>
                CREATE ACCOUNT
            </button>

            <button className="link" onClick={onBack}>
                BACK TO SIGN IN
            </button>
        </>
    );
}
