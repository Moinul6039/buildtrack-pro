import Card from "../components/common/Card";

const Settings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage project preferences
                </p>
            </div>

            <Card>
                <h2 className="text-lg font-bold text-slate-900">Project Settings</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Settings features will be added later.
                </p>
            </Card>
        </div>
    );
};

export default Settings;