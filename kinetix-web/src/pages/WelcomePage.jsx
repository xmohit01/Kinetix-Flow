import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity, Target, Zap, Shield, ArrowRight, Code,
    Camera, User, TrendingUp, HelpCircle
} from 'lucide-react';

const WelcomePage = () => {
    const navigate = useNavigate();
    const launchSectionRef = useRef(null);
    const [isPulsing, setIsPulsing] = useState(false);

    const scrollToLaunch = () => {
        launchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        // Trigger the "toggles then once" effect
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
    };

    // DO NOT CHANGE THESE - These are the fixed, working avatars!
    const makers = [
        {
            name: 'Mohit Gupta',
            role: 'Full Stack',
            image: 'https://api.dicebear.com/9.x/micah/svg?seed=Aidan&backgroundColor=transparent'
        },
        {
            name: 'Gurkirat Singh',
            role: 'Back End',
            image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Gurkirat&top=turban&accessories=prescription02&facialHair=beardMedium&backgroundColor=transparent'
        },
        {
            name: 'Krish Kalra',
            role: 'Front End',
            image: 'https://api.dicebear.com/9.x/micah/svg?seed=KrishBoy&backgroundColor=transparent'
        },
        {
            name: 'Lakshit Chaudhry',
            role: 'Front End',
            image: 'https://api.dicebear.com/9.x/micah/svg?seed=LakshitBoy&backgroundColor=transparent'
        },
    ];

    const benefits = [
        {
            icon: <Target className="w-8 h-8 text-neon-cyan mb-4" />,
            title: 'Precision Tracking',
            description: 'Advanced MediaPipe pose detection tracks your joints in 3D space for pixel-perfect form analysis.',
        },
        {
            icon: <Zap className="w-8 h-8 text-neon-green mb-4" />,
            title: 'Real-Time Feedback',
            description: 'Get instant visual and metric-based corrections as you move, keeping your workouts safe and effective.',
        },
        {
            icon: <Shield className="w-8 h-8 text-neon-cyan mb-4" />,
            title: 'Privacy First',
            description: '100% of the AI processing happens right in your browser. No video is ever recorded or sent to a server.',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 overflow-y-auto font-sans selection:bg-neon-cyan/30">

            {/* --- TOP NAVIGATION --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/50 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="w-8 h-8 text-neon-green" />
                    <span className="text-xl font-black tracking-tighter text-white">KINETIX</span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/auth')}
                        className="text-slate-300 font-bold text-sm hover:text-white transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Join Now
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20 pb-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="w-14 h-14 text-neon-green animate-pulse" />
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
                            KINETIX
                        </h1>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-semibold mb-6 max-w-3xl leading-tight text-white">
                        Elevate Your Workout with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green italic">Real-Time AI</span> Form Correction
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl">
                        Kinetix uses your webcam and advanced MediaPipe pose detection to monitor your movements, count reps, and ensure your form is perfect—all right here in your browser.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={scrollToLaunch}
                            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.4)]"
                        >
                            ENTER DASHBOARD
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button
                            onClick={() => navigate('/auth')}
                            className="border border-neon-cyan text-neon-cyan px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-neon-cyan/10 hover:scale-105"
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>
            </section>

            {/* --- TRUST METRICS BANNER --- */}
            <div className="w-full bg-white/5 border-y border-white/10 backdrop-blur-sm py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-neon-cyan mb-2">10k+</div>
                            <div className="text-sm uppercase tracking-widest text-slate-400 font-bold">Workouts Analyzed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-neon-cyan mb-2">&lt; 50ms</div>
                            <div className="text-sm uppercase tracking-widest text-slate-400 font-bold">Real-Time Latency</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-neon-cyan mb-2">100%</div>
                            <div className="text-sm uppercase tracking-widest text-slate-400 font-bold">Local Processing</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-neon-cyan mb-2">24/7</div>
                            <div className="text-sm uppercase tracking-widest text-slate-400 font-bold">AI Availability</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- VISION SECTION (ZIG-ZAG LAYOUT) --- */}
            <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                {/* Vision Block 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <h3 className="text-neon-green font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Our Vision
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Democratizing Personal Fitness
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            We believe elite personal training shouldn't be a luxury. We want to bring real-time, AI-powered form correction to everyone, anywhere. No expensive equipment, no pricey trainers—just your webcam and Kinetix.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-green rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop"
                            alt="Gym Workout"
                            className="relative rounded-2xl border border-white/10 shadow-2xl object-cover h-[400px] w-full"
                        />
                    </div>
                </div>

                {/* Vision Block 2 (Flipped) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <h3 className="text-neon-cyan font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                            <Shield className="w-4 h-4" /> The Technology
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            AI Powered, Privacy First
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Using state-of-the-art MediaPipe Machine Learning models, Kinetix analyzes 33 3D body landmarks at 30 frames per second. Because all processing happens directly in your browser, your video feed never touches a server.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-green rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                            alt="Data and Technology"
                            className="relative rounded-2xl border border-white/10 shadow-2xl object-cover h-[400px] w-full"
                        />
                    </div>
                </div>

                {/* Vision Block 3 */}
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <h3 className="text-neon-green font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                            <Target className="w-4 h-4" /> Accessibility
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            For Every Body, Everywhere
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Whether you are perfecting your bicep curls in a gym, practicing squats in your living room, or holding a plank in a hotel, Kinetix adapts to your environment to give you the feedback you need to grow safely.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-green rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
                            alt="Home Workout"
                            className="relative rounded-2xl border border-white/10 shadow-2xl object-cover h-[400px] w-full"
                        />
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">Why Choose Kinetix?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
                            <div className="group-hover:scale-110 transition-transform origin-left">
                                {benefit.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">{benefit.title}</h4>
                            <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- HOW IT WORKS SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">How Kinetix Works</h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Get started in seconds with our simple three-step process.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl overflow-hidden group">
                        <span className="absolute -top-4 -right-4 text-9xl font-black text-white/5 group-hover:text-neon-cyan/10 transition-colors">1</span>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-neon-cyan/20 rounded-2xl flex items-center justify-center mb-6">
                                <Camera className="w-8 h-8 text-neon-cyan" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">Grant Access</h4>
                            <p className="text-slate-400 leading-relaxed">Securely allow browser camera access. Everything runs locally in your browser.</p>
                        </div>
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl overflow-hidden group">
                        <span className="absolute -top-4 -right-4 text-9xl font-black text-white/5 group-hover:text-neon-green/10 transition-colors">2</span>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-neon-green/20 rounded-2xl flex items-center justify-center mb-6">
                                <User className="w-8 h-8 text-neon-green" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">Step Back</h4>
                            <p className="text-slate-400 leading-relaxed">Position yourself so the AI can track your full body in the frame for accurate detection.</p>
                        </div>
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl overflow-hidden group">
                        <span className="absolute -top-4 -right-4 text-9xl font-black text-white/5 group-hover:text-neon-cyan/10 transition-colors">3</span>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-neon-cyan/20 rounded-2xl flex items-center justify-center mb-6">
                                <TrendingUp className="w-8 h-8 text-neon-cyan" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">Level Up</h4>
                            <p className="text-slate-400 leading-relaxed">Perform your workout while our AI counts reps and corrects form in real-time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SUPPORTED EXERCISES SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">Supported Exercises</h2>
                    <p className="text-slate-400 mt-4">Our AI is trained on a wide variety of movements.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {['Bicep Curls', 'Squats', 'Lunges', 'Push-ups', 'Planks', 'Jumping Jacks', 'Shoulder Press', 'Hip Thrusts'].map((exercise) => (
                        <div key={exercise} className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-slate-300 hover:border-neon-cyan hover:text-neon-cyan transition-all cursor-default hover:scale-105">
                            {exercise}
                        </div>
                    ))}
                </div>
            </section>

            {/* --- READY TO START SECTION --- */}
            <section ref={launchSectionRef} className="max-w-7xl mx-auto px-6 py-32 text-center relative border-t border-white/10">
                <div className="absolute inset-0 bg-neon-green/5 blur-[120px] rounded-full"></div>
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                        Your Personal AI Trainer <br /> Is Waiting.
                    </h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`group relative inline-flex items-center gap-4 bg-neon-green text-black px-12 py-6 rounded-full font-black text-2xl transition-all duration-500 ${isPulsing ? 'scale-110 shadow-[0_0_60px_rgba(57,255,20,0.8)]' : 'hover:scale-110 hover:shadow-[0_0_60px_rgba(57,255,20,0.6)]'
                            }`}
                    >
                        LAUNCH KINETIX
                        <Zap className={`w-8 h-8 fill-black ${isPulsing ? 'animate-bounce' : ''}`} />
                    </button>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
                <div className="text-center mb-16">
                    <h3 className="text-neon-cyan font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
                        <HelpCircle className="w-4 h-4" /> FAQ
                    </h3>
                    <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-white mb-3 italic text-neon-cyan">Do you record or store my video?</h4>
                        <p className="text-slate-400 leading-relaxed">Absolutely not. Kinetix uses MediaPipe to process your webcam feed entirely locally in your browser. No video data ever leaves your device.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-white mb-3 italic text-neon-cyan">Do I need a special camera?</h4>
                        <p className="text-slate-400 leading-relaxed">No! Any standard laptop or phone webcam works perfectly. Our AI is trained to adapt to various lighting and angles.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-white mb-3 italic text-neon-cyan">Which exercises are supported?</h4>
                        <p className="text-slate-400 leading-relaxed">Currently, we support Bicep Curls, Squats, Lunges, Push-ups, and Planks, with many more being added by our team.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-white mb-3 italic text-neon-cyan">Is Kinetix free to use?</h4>
                        <p className="text-slate-400 leading-relaxed">Yes! Kinetix is currently in public beta and is 100% free to use to democratize personal fitness.</p>
                    </div>
                </div>
            </section>

            {/* --- MEET THE TEAM SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
                <div className="text-center mb-16">
                    <h3 className="text-neon-green font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
                        <Code className="w-4 h-4" /> The Team
                    </h3>
                    <h2 className="text-4xl font-bold text-white">Meet the Team</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {makers.map((maker, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-1 shadow-[0_0_20px_rgba(0,255,255,0.05)] group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300">
                                <img
                                    src={maker.image}
                                    alt={maker.name}
                                    className="w-full h-full object-cover rounded-full bg-slate-800"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">{maker.name}</h4>
                            <p className="text-slate-400 font-medium text-sm mt-1">{maker.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PROFESSIONAL FOOTER --- */}
            <footer className="bg-slate-950 border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-6 h-6 text-neon-green" />
                                <span className="text-xl font-black tracking-tighter text-white">KINETIX</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Elevating fitness through real-time AI form correction. 100% private, 100% browser-based.
                            </p>
                            <div className="text-xs text-slate-500 font-medium">
                                © {new Date().getFullYear()} Kinetix. All rights reserved.
                            </div>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-4">Product</h5>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><button onClick={() => navigate('/dashboard')} className="hover:text-neon-cyan transition-colors">Dashboard</button></li>
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">Supported Exercises</a></li>
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">Updates</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-4">Company</h5>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">The Team</a></li>
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-4">Legal</h5>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-neon-cyan transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default WelcomePage;
