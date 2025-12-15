import { useState } from "react";

export default function MaterialInput({ label, type = "text" }) {
    const [value, setValue] = useState("");

    return (
        <div className={`input ${value ? "active" : ""}`}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
