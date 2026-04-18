import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("[Kinetix Error Boundary Catch]", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] w-full bg-slate-900 border-2 border-red-500/20 rounded-[40px] flex flex-col items-center justify-center p-12 text-center backdrop-blur-3xl">
                    <ShieldAlert className="w-16 h-16 text-red-500 mb-6 animate-pulse" />
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Tactical Failure</h2>
                    <p className="text-slate-400 text-sm max-w-md mb-8 font-bold uppercase tracking-widest">
                        {this.state.error?.message || "A biomechanical data collision occurred during phase transition."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-10 py-4 bg-white text-black font-black uppercase rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                        <RefreshCw className="w-5 h-5" /> Reboot System
                    </button>
                    <div className="mt-8 p-4 bg-black/40 rounded-xl w-full max-w-lg">
                        <p className="text-[10px] text-red-400 font-mono text-left break-all opacity-50">
                            {this.state.error?.stack?.split('\n').slice(0, 3).join('\n')}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
