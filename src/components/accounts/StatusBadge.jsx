const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case "Paid":
                return "bg-green-100 text-green-800 border-green-200";
            case "Partial Paid":
                return "bg-amber-100 text-amber-800 border-amber-200";
            case "Due":
                return "bg-red-100 text-red-800 border-red-200";
            case "Cash In":
                return "bg-green-100 text-green-800 border-green-200";
            case "Cash Out":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
