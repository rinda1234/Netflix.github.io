import MaterialInput from "./MaterialInput";

export default function SignupForm({ onBack }) {
    return (
        <>
            <h2>Sign Up</h2>

            <MaterialInput label="Email" />
            <MaterialInput label="Password" type="password" />
            <MaterialInput label="Confirm Password" type="password" />

            <button className="primary">CREATE ACCOUNT</button>

            <button className="link" onClick={onBack}>
                BACK TO SIGN IN
            </button>
        </>
    );
}
