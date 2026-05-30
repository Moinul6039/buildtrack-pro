import { formatCurrency } from "../../utils/formatCurrency";

const AccountSummaryCard = ({ title, amount, icon: Icon, bgColor = "bg-blue-500" }) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {formatCurrency(amount)}
                    </p>
                </div>
                {Icon && (
                    <div className={`rounded-xl ${bgColor} p-3 text-white`}>
                        <Icon size={28} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSummaryCard;
