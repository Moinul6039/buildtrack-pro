const Select = ({
    label,
    error,
    id,
    name,
    options = [],
    placeholder = "Select option",
    required = false,
    className = "",
    ...props
}) => {
    const selectId = id || name;

    return (
        <div>
            {label && (
                <label
                    htmlFor={selectId}
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    {label}
                    {required && <span className="ml-1 text-rose-500">*</span>}
                </label>
            )}

            <select
                id={selectId}
                name={name}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${error
                        ? "border-rose-300 bg-rose-50 focus:border-rose-500"
                        : "border-slate-200 bg-white focus:border-blue-500"
                    } ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
        </div>
    );
};

export default Select;