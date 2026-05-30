import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        const result = login(email, password);

        if (result.error) {
            setError(result.error);
            return;
        }

        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4 text-center lg:text-left">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600">BuildTrack Pro</p>
                    <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Login to your account</h1>
                    <p className="max-w-xl text-sm text-slate-500">Use the demo credentials below or sign in with your project account.</p>
                </div>

                <Card className="w-full max-w-xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
                        <p className="mt-2 text-sm text-slate-500">Use the demo credentials below or sign in with your project account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="admin@gmail.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="123456"
                                required
                            />
                        </div>

                        {error && (
                            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {error}
                            </p>
                        )}

                        <Button type="submit" className="w-full">Login</Button>
                    </form>

                    <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-900">Demo credentials</p>
                        <p className="mt-2">Admin: admin@gmail.com / 123456</p>
                        <p>Engineer: engineer@gmail.com / 123456</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
