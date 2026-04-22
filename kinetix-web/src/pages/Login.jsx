import React, { useState } from 'react';
import { Activity, ArrowRight, Mail, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email.includes('@')) {
            setError('Please enter a valid email containing "@".');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setError('');
        onLogin();
    };
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-10 h-10 text-cyan-400" />
                        <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                            KINETIX-FLOW
                        </span>
                    </div>
                    <p className="text-slate-400 text-center font-medium">
                        Log in to start your real-time fitness tracking session.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center font-medium">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-900 border border-white/10 rounded-xl px-12 py-4 w-full text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-900 border border-white/10 rounded-xl px-12 py-4 w-full text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="group w-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan-400/20"
                    >
                        GET STARTED
                        <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
