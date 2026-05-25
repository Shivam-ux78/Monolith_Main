import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';

interface Lead {
    id: string;
    created: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
    message: string;
}

export default function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    
    // We check auth on mount
    useEffect(() => {
        if (pb.authStore.isValid && pb.authStore.isAdmin) {
            fetchLeads();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const records = await pb.collection('leads').getFullList<Lead>({ sort: '-created' });
            setLeads(records);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await pb.admins.authWithPassword(email, password);
            fetchLeads();
        } catch (err) {
            console.error(err);
            alert("Invalid master credentials.");
            setLoading(false);
        }
    };

    const handleLogout = () => {
        pb.authStore.clear();
        setLeads([]);
    };

    // Render Login
    if (!pb.authStore.isValid || !pb.authStore.isAdmin) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#050505] text-white p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FFFF]/10 via-[#050505] to-[#050505] pointer-events-none"></div>
                <div className="relative z-10 glassmorphism p-10 rounded border border-[rgba(255,255,255,0.05)] shadow-2xl max-w-sm w-full">
                    <h2 className="font-display font-bold text-2xl mb-2 text-[#00FFFF]">Admin Access</h2>
                    <p className="text-sm font-sans text-[#b9cac9] mb-8">Authenticate to view monolith leads.</p>
                    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                            className="bg-[#0A192F] bg-opacity-50 border border-[rgba(255,255,255,0.1)] rounded px-4 py-2 text-white focus:border-[#00FFFF] outline-none" required />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                            className="bg-[#0A192F] bg-opacity-50 border border-[rgba(255,255,255,0.1)] rounded px-4 py-2 text-white focus:border-[#00FFFF] outline-none" required />
                        <button type="submit" disabled={loading} className="glow-btn mt-4">
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Render Dashboard
    return (
        <div className="w-full min-h-screen bg-[#050505] text-white py-24 px-8 md:px-16 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="font-display font-bold text-4xl text-[#00FFFF]">Command Center</h1>
                        <p className="font-sans text-[#b9cac9] mt-2">Incoming leads from the monolith architecture.</p>
                    </div>
                    <button onClick={handleLogout} className="ghost-btn">Sign Out</button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><span className="w-8 h-8 rounded-full border-4 border-[#00FFFF] border-t-transparent animate-spin"></span></div>
                ) : (
                    <div className="glassmorphism rounded-lg border border-[rgba(255,255,255,0.05)] overflow-x-auto shadow-2xl">
                        <table className="w-full text-left font-sans border-collapse">
                            <thead>
                                <tr className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
                                    <th className="px-6 py-4 text-xs tracking-widest uppercase text-[#b9cac9]">Received</th>
                                    <th className="px-6 py-4 text-xs tracking-widest uppercase text-[#b9cac9]">Designation</th>
                                    <th className="px-6 py-4 text-xs tracking-widest uppercase text-[#b9cac9]">Contact</th>
                                    <th className="px-6 py-4 text-xs tracking-widest uppercase text-[#b9cac9]">Project Spec</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-12 text-center text-[#b9cac9]">No records found in database.</td></tr>
                                ) : leads.map(lead => (
                                    <tr key={lead.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,255,255,0.05)] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgba(255,255,255,0.5)]">
                                            {new Date(lead.created).toLocaleDateString()}
                                            <br/><span className="text-xs">{new Date(lead.created).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold">{lead.name}</div>
                                            <div className="text-xs text-[#b9cac9] mt-1">{lead.businessName || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div>{lead.email}</div>
                                            <div className="text-xs text-[#b9cac9] mt-1">{lead.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm line-clamp-3 max-w-lg leading-relaxed">{lead.message}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
