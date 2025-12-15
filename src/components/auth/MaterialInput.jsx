export default function MaterialInput({
                                          label,
                                          type = "text",
                                          value,
                                          onChange,
                                      }) {
    const active = value && value.length > 0;

    return (
        <div className={`input ${active ? "active" : ""}`}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <span className="spin" />
        </div>
    );
}
