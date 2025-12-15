import MaterialInput from "./MaterialInput";

export default function LoginForm({ onSignup }) {
    return (
        <>
            <h2>Sign In</h2>

            <MaterialInput label="Email" />
            <MaterialInput label="Password" type="password" />

            <button className="primary">SIGN IN</button>

            <button className="link" onClick={onSignup}>
                SIGN UP
            </button>
        </>
    );
}
