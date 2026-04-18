import React from 'react';

const SummaryPage = ({ data = {}, onBack }) => {
    // 1. FAILSAFE GUARD: Immediate return if data isn't a valid object
    if (!data || typeof data !== 'object') {
        return (
            <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-20 text-white text-3xl text-center">
                WORKOUT COMPLETE! <br />
                <button
                    onClick={onBack}
                    className="mt-8 px-10 py-4 bg-white text-black font-black uppercase rounded-2xl text-xl"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen overflow-y-auto bg-slate-950 flex flex-col items-center justify-start pt-10 pb-32 px-4">
            <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-500">

                <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white text-center">
                    SESSION <span className="text-neon-cyan">SUMMARY</span>
                </h1>

                {/* THE USER-REQUESTED CRASH-PROOF MAPPING WITH TIME BOX */}
                <div className="mt-8 space-y-6 text-white w-full">
                    {Object.entries(data || {}).map(([exerciseName, stats], index) => {
                        return (
                            <div key={index} className="p-8 bg-gray-800/40 rounded-3xl border border-gray-700 shadow-xl backdrop-blur-md">
                                <h3 className="text-2xl text-neon-cyan font-black uppercase italic mb-6">
                                    {String(exerciseName)}
                                </h3>
                                <div className="flex gap-4">
                                    {/* Existing Reps Box */}
                                    <div className="bg-gray-900/80 p-4 rounded-xl flex-1 border border-white/5">
                                        <p className="text-[10px] text-gray-500 font-black tracking-widest mb-1">TOTAL REPS</p>
                                        <p className="text-2xl text-white font-black">{String(typeof stats === 'object' ? (stats?.reps || 0) : stats)}</p>
                                    </div>
                                    {/* Existing Sets Box - NOW CALCULATED: REPS / 10 */}
                                    <div className="bg-gray-900/80 p-4 rounded-xl flex-1 border border-white/5">
                                        <p className="text-[10px] text-gray-500 font-black tracking-widest mb-1">SETS DONE</p>
                                        <p className="text-2xl text-white font-black">
                                            {String(Math.floor((Number(typeof stats === 'object' ? stats.reps : stats) || 0) / 10))}
                                        </p>
                                    </div>
                                    {/* NEW Time Taken Box */}
                                    <div className="bg-gray-900/80 p-4 rounded-xl flex-1 border border-white/5">
                                        <p className="text-[10px] text-gray-500 font-black tracking-widest mb-1">TIME TAKEN</p>
                                        <p className="text-2xl text-cyan-400 font-black underline decoration-cyan-400/20 underline-offset-4 tracking-tighter">
                                            {String(stats?.timeTaken || '0s')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-10">
                    <button
                        onClick={onBack}
                        className="w-full bg-white text-black py-8 rounded-[40px] font-black uppercase text-2xl hover:bg-neon-cyan hover:scale-[1.02] shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                    >
                        Return to Deck
                    </button>
                </div>

                {/* NUCLEAR DEBUG (STRING ONLY) */}
                <div className="mt-20 opacity-10 border-t border-white/5 pt-10">
                    <p className="text-[8px] font-mono text-center text-slate-500 uppercase tracking-widest">Biometric Log Dump • Tactical Debug On</p>
                    <pre className="text-[8px] text-slate-700 overflow-x-auto p-6 bg-black/40 rounded-xl mt-4 max-h-40">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>

            </div>
        </div>
    );
};

export default SummaryPage;
