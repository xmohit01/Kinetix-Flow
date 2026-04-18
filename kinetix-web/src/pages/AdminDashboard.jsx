import React from 'react';
import {
    Users,
    Activity,
    Database,
    Settings,
    Shield,
    TrendingUp,
    Clock,
    Search,
    Bell,
    ChevronRight,
    LayoutDashboard
} from 'lucide-react';

const AdminDashboard = () => {
    // Dummy Data
    const stats = [
        { label: 'Total Users', value: '1,204', icon: Users, trend: '+12.5%', color: 'text-neon-cyan' },
        { label: 'Workouts Logged', value: '8,430', icon: Activity, trend: '+18.2%', color: 'text-neon-green' },
        { label: 'Active Now', value: '42', icon: Clock, trend: 'Current', color: 'text-orange-500' },
        { label: 'Server Status', value: 'Online', icon: Database, trend: 'Stable', color: 'text-emerald-400', isStatus: true },
    ];

    const recentUsers = [
        { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', date: 'Oct 24, 2023', status: 'Active' },
        { id: 2, name: 'Sarah Miller', email: 'sarah.m@fitness.com', date: 'Oct 23, 2023', status: 'Active' },
        { id: 3, name: 'Marcus Chen', email: 'm.chen@tech.io', date: 'Oct 22, 2023', status: 'Pending' },
        { id: 4, name: 'Elena Rodriguez', email: 'elena.r@web.com', date: 'Oct 22, 2023', status: 'Active' },
        { id: 5, name: 'James Wilson', email: 'j.wilson@domain.net', date: 'Oct 21, 2023', status: 'Active' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* --- BACKGROUND GLOW --- */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* --- SIDEBAR --- */}
            <aside className="w-64 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col z-20">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-neon-cyan to-neon-green p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                        <Shield className="w-6 h-6 text-slate-950" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">KINETIX.ADMIN</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <SidebarLink icon={LayoutDashboard} label="Overview" active />
                    <SidebarLink icon={Users} label="Users" />
                    <SidebarLink icon={Activity} label="Workouts" />
                    <SidebarLink icon={Settings} label="Settings" />
                </nav>

                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-green flex items-center justify-center font-bold text-slate-950 text-xs shadow-lg">
                            AD
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-white leading-none">Admin User</p>
                            <p className="text-[10px] text-slate-500 mt-1">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 w-full text-sm outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-neon-green rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(57,255,20,0.5)]"></span>
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Welcome Header */}
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Systems Overview</h1>
                        <p className="text-slate-400 mt-1 font-medium">Monitoring platform health and user activity in real-time.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 border border-white/5 ${stat.trend === 'Current' || stat.trend === 'Stable' ? 'text-slate-400' : 'text-neon-green'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <h3 className="text-2xl font-black text-white tracking-tighter">{stat.value}</h3>
                                        {stat.isStatus && (
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green shadow-[0_0_10px_rgba(57,255,20,0.8)]"></span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Area */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Sign-ups</h2>
                            <button className="text-xs font-bold text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center gap-1 group">
                                View all Users
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Join Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-[10px] group-hover:border-neon-cyan/50 transition-colors">
                                                        {user.name[0]}
                                                    </div>
                                                    <span className="font-bold text-white text-sm">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-sm font-medium">{user.email}</td>
                                            <td className="px-6 py-4 text-slate-400 text-sm font-medium">{user.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${user.status === 'Active'
                                                        ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                                                        : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarLink = ({ icon: Icon, label, active = false }) => (
    <div className={`
        flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold group
        ${active
            ? 'bg-gradient-to-r from-neon-cyan/20 to-transparent text-neon-cyan border-l-2 border-neon-cyan'
            : 'text-slate-500 hover:text-white hover:bg-white/5'}
    `}>
        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-neon-cyan' : 'text-slate-500 group-hover:text-white'}`} />
        <span className="text-sm tracking-tight">{label}</span>
    </div>
);

export default AdminDashboard;
