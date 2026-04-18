import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Activity } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const url = `http://localhost:5000${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (isLogin) {
                // Save JWT and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                // Registration successful, switch to login
                setIsLogin(true);
                setError('Registration successful! Please sign in.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* --- BACKGROUND GLOW --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-neon-green/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* --- AUTH CARD --- */}
            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-8 h-8 text-neon-green" />
                        <span className="text-2xl font-black tracking-tighter text-white">KINETIX</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400 mt-2 text-center text-sm md:text-base">
                        {isLogin ? 'Enter your details to access your AI trainer' : 'Join the revolution in AI-powered fitness'}
                    </p>
                </div>

                {error && (
                    <div className={`p-3 rounded-lg text-sm text-center mb-6 ${error.includes('successful') ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-slate-900 border border-white/10 rounded-xl px-12 py-3 w-full text-white placeholder:text-slate-600 focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-slate-900 border border-white/10 rounded-xl px-12 py-3 w-full text-white placeholder:text-slate-600 focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-slate-900 border border-white/10 rounded-xl px-12 py-3 w-full text-white placeholder:text-slate-600 focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full bg-gradient-to-r from-neon-cyan to-neon-green text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'SIGN UP')}
                        {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                    </button>
                </form>

                {/* Toggle Link */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-neon-cyan font-bold hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                {/* Footer Quote */}
                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
                        Securely processed by Kinetix AI
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
