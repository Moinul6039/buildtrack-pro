const Input = ({
    label,
    error,
    id,
    className = "",
    required = false,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div>
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    {label}
                    {required && <span className="ml-1 text-rose-500">*</span>}
                </label>
            )}

            <input
                id={inputId}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 ${error
                        ? "border-rose-300 bg-rose-50 focus:border-rose-500"
                        : "border-slate-200 bg-white focus:border-blue-500"
                    } ${className}`}
                {...props}
            />

            {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
        </div>
    );
};

export default Input;