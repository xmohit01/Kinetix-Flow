import React, { useState } from 'react';
import {
    User,
    Scale,
    Ruler,
    Activity,
    Info,
    Target,
    Flame,
    Zap,
    ChevronRight,
    Search
} from 'lucide-react';

const HealthMetrics = () => {
    // 1. Mandatory Fix: Gender state (no dropdowns)
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');

    // 2. Unit Toggles State
    const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lbs'
    const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'ft'

    // 3. Dynamic Inputs State
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(''); // Used for 'cm' mode
    const [heightFt, setHeightFt] = useState(''); // Used for 'ft' mode
    const [heightIn, setHeightIn] = useState(''); // Used for 'ft' mode

    const [activityLevel, setActivityLevel] = useState('1.2');
    const [results, setResults] = useState(null);

    const activityLabels = {
        '1.2': 'Sedentary (Little to no exercise)',
        '1.375': 'Light (Exercise 1-3 days/week)',
        '1.55': 'Moderate (Exercise 3-5 days/week)',
        '1.725': 'Active (Exercise 6-7 days/week)',
        '1.9': 'Very Active (Intense exercise every day)'
    };

    const calculateMetrics = () => {
        // Validation check
        const isWeightValid = weight !== '';
        const isHeightValid = heightUnit === 'cm' ? height !== '' : (heightFt !== '' || heightIn !== '');
        const isAgeValid = age !== '';

        if (!isWeightValid || !isHeightValid || !isAgeValid) {
            alert("Protocol incomplete. Please provide all biomechanical data points.");
            return;
        }

        // 4. The Math Conversion Logic (Metric First)
        let finalWeightKg = weightUnit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
        let finalHeightCm = heightUnit === 'ft'
            ? (parseFloat(heightFt || 0) * 30.48) + (parseFloat(heightIn || 0) * 2.54)
            : parseFloat(height);

        const a = parseFloat(age);
        const activity = parseFloat(activityLevel);

        // Standard BMI Calculation: Weight (kg) / (Height (m))^2
        const bmi = finalWeightKg / Math.pow(finalHeightCm / 100, 2);

        // Standard Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * finalWeightKg) + (6.25 * finalHeightCm) - (5 * a) + 5;
        } else {
            bmr = (10 * finalWeightKg) + (6.25 * finalHeightCm) - (5 * a) - 161;
        }

        // TDEE Calculation
        const tdee = bmr * activity;

        setResults({
            bmi: bmi.toFixed(1),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee)
        });
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: 'text-orange-400', progress: (bmi / 40) * 100 };
        if (bmi < 25) return { label: 'Normal Weight', color: 'text-neon-green', progress: (bmi / 40) * 100 };
        if (bmi < 30) return { label: 'Overweight', color: 'text-orange-500', progress: (bmi / 40) * 100 };
        return { label: 'Obese', color: 'text-red-500', progress: Math.min(100, (bmi / 40) * 100) };
    };

    return (
        <div className="min-h-full w-full bg-slate-950 p-8 flex flex-col items-start overflow-y-auto pb-24">
            <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">
                        BODY <span className="text-neon-cyan">METRICS</span> CENTER
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs underline decoration-neon-cyan underline-offset-8">
                        Precision Health Configuration
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Input Form */}
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity className="w-24 h-24 text-neon-cyan" />
                        </div>

                        <h2 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3">
                            <Zap className="w-5 h-5 text-neon-cyan" /> Bio-Input Protocol
                        </h2>

                        <div className="space-y-6">

                            {/* GENDER SELECTOR (Fixed: No Dropdowns) */}
                            <div className="space-y-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Biological Gender</span>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setGender('male')}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 border ${gender === 'male' ? 'bg-neon-green/20 text-neon-green border-neon-green shadow-[0_0_20px_rgba(57,255,20,0.2)]' : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'}`}
                                    >
                                        <User size={14} /> Male
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 border ${gender === 'female' ? 'bg-neon-green/20 text-neon-green border-neon-green shadow-[0_0_20px_rgba(57,255,20,0.2)]' : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'}`}
                                    >
                                        <User size={14} /> Female
                                    </button>
                                </div>
                            </div>

                            {/* Age Input */}
                            <div className="space-y-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Age Protocol</span>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="number"
                                        placeholder="AGE (Years)"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-lg focus:border-neon-cyan outline-none transition-all placeholder:text-slate-700"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Weight Unit Toggle + Dynamic Input */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Weight Data</span>
                                    <div className="flex bg-black/40 rounded-xl overflow-hidden border border-white/5">
                                        <button onClick={() => setWeightUnit('kg')} className={`px-4 py-1 text-[8px] font-black uppercase transition-all ${weightUnit === 'kg' ? 'bg-neon-cyan text-black' : 'text-slate-500'}`}>KG</button>
                                        <button onClick={() => setWeightUnit('lbs')} className={`px-4 py-1 text-[8px] font-black uppercase transition-all ${weightUnit === 'lbs' ? 'bg-neon-cyan text-black' : 'text-slate-500'}`}>LBS</button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Scale className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="number"
                                        placeholder={`WEIGHT (${weightUnit.toUpperCase()})`}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-lg focus:border-neon-cyan outline-none transition-all placeholder:text-slate-700"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Height Unit Toggle + Dynamic Inputs */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Height Data</span>
                                    <div className="flex bg-black/40 rounded-xl overflow-hidden border border-white/5">
                                        <button onClick={() => setHeightUnit('cm')} className={`px-4 py-1 text-[8px] font-black uppercase transition-all ${heightUnit === 'cm' ? 'bg-neon-cyan text-black' : 'text-slate-500'}`}>CM</button>
                                        <button onClick={() => setHeightUnit('ft')} className={`px-4 py-1 text-[8px] font-black uppercase transition-all ${heightUnit === 'ft' ? 'bg-neon-cyan text-black' : 'text-slate-500'}`}>FT/IN</button>
                                    </div>
                                </div>

                                {heightUnit === 'cm' ? (
                                    <div className="relative">
                                        <Ruler className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="number"
                                            placeholder="HEIGHT (CM)"
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-lg focus:border-neon-cyan outline-none transition-all placeholder:text-slate-700"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-black">FT</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-lg focus:border-neon-cyan outline-none transition-all placeholder:text-slate-700 font-mono"
                                                value={heightFt}
                                                onChange={(e) => setHeightFt(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-black">IN</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-lg focus:border-neon-cyan outline-none transition-all placeholder:text-slate-700 font-mono"
                                                value={heightIn}
                                                onChange={(e) => setHeightIn(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Activity Level */}
                            <div className="space-y-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Activity Protocol</span>
                                <div className="relative">
                                    <Activity className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <select
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-14 py-5 text-neon-cyan font-black text-sm focus:border-neon-cyan outline-none transition-all appearance-none"
                                        value={activityLevel}
                                        onChange={(e) => setActivityLevel(e.target.value)}
                                    >
                                        {Object.entries(activityLabels).map(([val, label]) => (
                                            <option key={val} value={val} className="bg-slate-900 text-white font-sans">{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={calculateMetrics}
                                className="w-full py-6 bg-gradient-to-r from-neon-cyan to-neon-green text-black font-black uppercase text-xl rounded-[30px] shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-95 transition-all mt-4"
                            >
                                Calculate Biometrics
                            </button>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="space-y-6 mt-10 md:mt-0">
                        {!results ? (
                            <div className="h-full bg-white/5 border border-white/10 border-dashed rounded-[40px] flex flex-col items-center justify-center p-12 text-center opacity-40 min-h-[400px]">
                                <Search className="w-16 h-16 text-slate-500 mb-6" />
                                <h3 className="text-xl font-black uppercase italic text-slate-400">Awaiting Signal</h3>
                                <p className="text-xs text-slate-600 font-bold uppercase tracking-widest mt-2 px-8">Complete the bio-input protocol to initiate biometric analysis</p>
                            </div>
                        ) : (
                            <>
                                {/* BMI Gauge */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">BMI INDEX Score</p>
                                        <span className={`text-xl font-black italic ${getBMICategory(results.bmi).color}`}>
                                            {getBMICategory(results.bmi).label}
                                        </span>
                                    </div>
                                    <h1 className="text-5xl font-black text-white italic mb-4">{results.bmi}</h1>
                                    <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-1000 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                            style={{ width: `${getBMICategory(results.bmi).progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* BMR & TDEE */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Base Metabolic (BMR)</p>
                                        <div className="flex items-baseline gap-2">
                                            <h1 className="text-3xl font-black text-white italic">{results.bmr}</h1>
                                            <span className="text-[8px] text-slate-500 font-black uppercase">kcal/day</span>
                                        </div>
                                    </div>
                                    <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-3xl p-6 backdrop-blur-2xl">
                                        <p className="text-[10px] font-black text-neon-cyan uppercase tracking-widest mb-1">Total Burn (TDEE)</p>
                                        <div className="flex items-baseline gap-2">
                                            <h1 className="text-3xl font-black text-neon-cyan italic">{results.tdee}</h1>
                                            <span className="text-[8px] text-neon-cyan/60 font-black uppercase">kcal/day</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actionable Insights */}
                                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                                        <Target className="w-3 h-3 text-neon-green" /> Tactical Diet Protocol
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-red-500/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                                    <Flame className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Weight Loss</p>
                                                    <p className="text-sm font-black text-white italic">Aggressive Deficit</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-black text-red-500">{results.tdee - 500} kcal</span>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-neon-green/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center text-neon-green">
                                                    <Zap className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Muscle Gain</p>
                                                    <p className="text-sm font-black text-white italic">Lean Bulk Phase</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-black text-neon-green">{results.tdee + 300} kcal</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Info Footer */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl opacity-60">
                    <Info className="w-4 h-4 text-neon-cyan shrink-0" />
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Precision conversion engine utilizes standard metrics (1lb = 0.45kg | 1ft = 30.48cm) for tactical consistency. Consult a medical officer for clinical health assessment.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HealthMetrics;
