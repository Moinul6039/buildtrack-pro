const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
        warning: "bg-amber-500 text-white hover:bg-amber-600",
        outline:
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    };

    const sizeClasses = {
        sm: "px-3 py-2 text-xs",
        md: "px-5 py-3 text-sm",
        lg: "px-6 py-3.5 text-base",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;