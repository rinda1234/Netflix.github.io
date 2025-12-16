export default function MaterialInput({
                                          label,
                                          type = "text",
                                          value,
                                          onChange,
                                      }) {
    return (
        <div className={`input ${value ? "active" : ""}`}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
