import React, { useState } from 'react';
import HeroScene from '../components/HeroScene';
import { pb } from '../lib/pocketbase';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', businessName: '', message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // Security: Basic input sanitation
    const sanitize = (text: string) => {
        if (!text) return '';
        return text
            .trim()
            .replace(/[<>]/g, '') // Prevent basic XSS
            .slice(0, 2000);     // Prevent excessive data
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Rate Limiting: 3 messages per 5 minutes
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        const submissions = JSON.parse(localStorage.getItem('contact_tracker') || '[]');
        const recentSubmissions = submissions.filter((timestamp: number) => now - timestamp < fiveMinutes);

        if (recentSubmissions.length >= 3) {
            alert("Transmission paused. System has reached maximum throughput for this terminal. Please wait 5 minutes.");
            return;
        }

        setLoading(true);

        // Defense in Depth: Sanitize all fields before transmission
        const sanitizedData = {
            name: sanitize(formData.name),
            email: sanitize(formData.email),
            phone: sanitize(formData.phone),
            businessName: sanitize(formData.businessName),
            message: sanitize(formData.message)
        };

        try {
            await pb.collection('leads').create(sanitizedData);
            
            // Update rate limit tracker
            recentSubmissions.push(now);
            localStorage.setItem('contact_tracker', JSON.stringify(recentSubmissions));

            window.dispatchEvent(new CustomEvent('leadSuccess'));
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', businessName: '', message: '' });
        } catch (err) {
            console.error(err);
            alert("Transmission failed. Please check network connection.");
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative w-full min-h-screen text-white flex items-center justify-center">
            <HeroScene type="contact" />
            <div className="relative z-10 w-full max-w-4xl mx-auto px-12 md:px-24">
                <div className="glassmorphism p-12 md:p-16 rounded-md border border-[rgba(0,255,255,0.1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] mx-auto max-w-2xl relative overflow-hidden">
                    {/* Tech accent lines */}
                    <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#00FFFF]"></div>
                    <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#00FFFF]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#00FFFF]"></div>
                    <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#00FFFF]"></div>

                    {success ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                             <div className="w-16 h-16 bg-[#00FFFF] rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                                <svg className="w-8 h-8 text-[#050505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-2">Request Submitted</h2>
                                <p className="font-sans text-[#b9cac9] text-sm">Your secure transmission has been received. I will establish a connection shortly.</p>
                            </div>
                            <div className="flex flex-col space-y-4 pt-4">
                                <a 
                                    href="https://wa.me/1234567890?text=Hi, I just submitted a request on your website!" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="glow-btn flex items-center justify-center"
                                >
                                    CONTACT ON WHATSAPP
                                </a>
                                <button onClick={() => setSuccess(false)} className="text-[#00FFFF] text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                                    Send another message
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-12 text-center md:text-left">
                                <h2 className="font-display text-4xl font-bold text-glow text-[#00FFFF] mb-3 uppercase tracking-tight">Let's Build Something</h2>
                                <p className="font-sans text-[#b9cac9] text-sm tracking-wide opacity-80 border-l border-[rgba(255,255,255,0.2)] pl-4 py-1 inline-block md:block">Fill out the details below and we will get back to you shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col relative group">
                                        <label className="font-sans text-xs text-[#00FFFF] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity font-semibold">Full Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="bg-[#0A192F] bg-opacity-30 border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] transition-all hover:border-[rgba(0,255,255,0.3)] w-full placeholder-[rgba(255,255,255,0.2)] focus:bg-[rgba(0,255,255,0.05)]" placeholder="John Doe" />
                                    </div>
                                    
                                    <div className="flex flex-col relative group">
                                        <label className="font-sans text-xs text-[#00FFFF] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity font-semibold">Email Address</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="bg-[#0A192F] bg-opacity-30 border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] transition-all hover:border-[rgba(0,255,255,0.3)] w-full placeholder-[rgba(255,255,255,0.2)] focus:bg-[rgba(0,255,255,0.05)]" placeholder="john@example.com" />
                                    </div>

                                    <div className="flex flex-col relative group">
                                        <label className="font-sans text-xs text-[#00FFFF] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity font-semibold">Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="bg-[#0A192F] bg-opacity-30 border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] transition-all hover:border-[rgba(0,255,255,0.3)] w-full placeholder-[rgba(255,255,255,0.2)] focus:bg-[rgba(0,255,255,0.05)]" placeholder="(555) 123-4567" />
                                    </div>

                                    <div className="flex flex-col relative group">
                                        <label className="font-sans text-xs text-[#00FFFF] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity font-semibold">Business Name</label>
                                        <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="bg-[#0A192F] bg-opacity-30 border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] transition-all hover:border-[rgba(0,255,255,0.3)] w-full placeholder-[rgba(255,255,255,0.2)] focus:bg-[rgba(0,255,255,0.05)]" placeholder="Company LLC" />
                                    </div>
                                </div>

                                <div className="flex flex-col relative group">
                                    <label className="font-sans text-xs text-[#00FFFF] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity font-semibold">Project Details</label>
                                    <textarea rows={4} name="message" required value={formData.message} onChange={handleChange} className="bg-[#0A192F] bg-opacity-30 border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] transition-all hover:border-[rgba(0,255,255,0.3)] w-full resize-none placeholder-[rgba(255,255,255,0.2)] focus:bg-[rgba(0,255,255,0.05)]" placeholder="Tell us about the website you need built..."></textarea>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="glow-btn w-full hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 flex justify-center items-center h-[52px]">
                                        {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
