import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaterialInput from "./MaterialInput";
import { hashPassword } from "../../api/tmdbAuth";


export default function LoginForm({ onSignup }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const remembered =
            JSON.parse(localStorage.getItem("rememberUser"));

        if(!remembered) return;

        setUsername(remembered.username);
        setPassword("");
        setRemember(true);
    }, []);

    const handleLogin = async () => {
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const hashed = await hashPassword(password);

        const user = users.find(
            (u) =>
                u.username === username &&
                u.password === hashed
        );

        if (!user) {
            setError("아이디 또는 비밀번호가 틀렸습니다.");
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);

        if (remember) {
            localStorage.setItem("keepLogin", "true");
            localStorage.setItem(
                "rememberUser",
                JSON.stringify({ username })
            );
        } else {
            localStorage.removeItem("keepLogin");
            localStorage.removeItem("rememberUser");
        }

        navigate("/");
    };


    return (
        <>
            <h2>Sign In</h2>

            <MaterialInput
                label="Username"
                value={username}
                onChange={setUsername}
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

            {error && <div className="error-message">{error}</div>}

            <button className="primary" onClick={handleLogin}>
                SIGN IN
            </button>

            <button className="link" onClick={onSignup}>
                SIGN UP
            </button>
        </>
    );
}
