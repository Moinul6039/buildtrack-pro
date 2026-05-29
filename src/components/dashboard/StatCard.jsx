import Card from "../common/Card";

const StatCard = ({ title, value, icon: Icon, note, trend }) => {
    return (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900">{value}</h3>
                    <p className="mt-2 text-xs text-slate-500">{note}</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                </div>
            </div>

            {trend && (
                <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                    {trend}
                </div>
            )}
        </Card>
    );
};

export default StatCard;