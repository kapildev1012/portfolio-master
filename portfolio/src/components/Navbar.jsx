import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Instagram, Linkedin, Github, Wifi, Battery, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function handleNavClick(e, id, setMobileOpen) {
    e.preventDefault();
    if (setMobileOpen) setMobileOpen(false);
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

const NAV_LINKS = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);

        // Live system clock for the technical footer
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2in', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            {/* ── Desktop Floating Pill ── */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 8px',
                        borderRadius: '100px',
                        border: scrolled
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(255,255,255,0.2)',
                        background: scrolled
                            ? 'rgba(8, 10, 22, 0.80)'
                            : 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow: scrolled
                            ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
                            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={e => handleNavClick(e, link.id)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(255,255,255,0.78)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.78)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 4px', flexShrink: 0 }} />

                    <a
                        href="https://drive.google.com/file/d/1PNoOM-hgEHcUPdvFzyM4crW9Q93exKFY/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 22px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#fff',
                            textDecoration: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 2px 12px rgba(99,102,241,0.45)',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Resume ↗
                    </a>
                </nav>
            </header>

            {/* ── Mobile Top Bar (Glass Pill) ── */}
            <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:hidden transition-all duration-500 ${mobileOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <div
                    className="flex flex-row items-center justify-between w-full pointer-events-auto"
                    style={{
                        padding: '12px 32px',
                        borderRadius: '100px',
                        border: scrolled
                            ? '1px solid rgba(255,255,255,0.18)'
                            : '1px solid rgba(255,255,255,0.08)',
                        background: scrolled
                            ? 'rgba(8, 10, 22, 0.82)'
                            : 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow: scrolled
                            ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                            : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <span className="text-white text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase opacity-90 select-none">
                        Kapil Dev
                    </span>
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                        }}
                        className="active:scale-95 active:bg-white/20"
                    >
                        <Menu size={18} color="#fff" />
                    </button>
                </div>
            </header>

            {/* ── Elite Editorial Mobile Navigation ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Interactive Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
                        />

                        {/* Floating Terminal Island (100% HUD Masterpiece) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed inset-4 sm:inset-10 z-50 md:hidden flex flex-col bg-[#050505]/98 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] text-white py-10 px-7 sm:py-14 sm:px-14 overflow-hidden"
                        >
                            {/* Masterpiece: Holographic Scanline Sweep */}
                            <motion.div
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-[25vh] bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none z-0"
                            />
                            {/* HUD Details */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" />

                            {/* Inner Menu Header (HUD Refined) */}
                            <div className="flex flex-col items-center justify-center w-full mb-8 shrink-0 relative z-10">
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="absolute right-0 -top-2 flex flex-col items-center gap-1 group active:scale-90 transition-transform pl-12"
                                >
                                    <div className="relative w-10 h-10 flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-white/10 group-hover:border-purple-500/40"
                                            animate={{ rotate: 180 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-purple-500 rounded-full blur-[1px]" />
                                        </motion.div>
                                        <div className="relative z-10 p-2.5 rounded-full bg-white/5 border border-white/10 shadow-2xl group-hover:bg-white/10 transition-colors">
                                            <X size={18} color="#fff" />
                                        </div>
                                    </div>
                                    <span className="text-[7px] font-mono tracking-[0.4em] text-white/20 uppercase"></span>
                                </button>
                                <div className="flex flex-col items-center gap-1.5 mt-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="size-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
                                        <span className="text-[7.5px] font-mono tracking-[0.4em] uppercase text-purple-400/50">
                                            ......
                                        </span>
                                    </div>
                                    <span className="text-white text-xl font-black tracking-[0.1em] uppercase select-none font-sans text-center">
                                        Kapil Dev
                                    </span>
                                </div>
                            </div>

                            {/* Bio Data Section (Compact) */}
                            <div className="flex flex-col items-center gap-10 mb-12 relative z-10 px-2 group text-center">
                                <div className="flex flex-col items-center w-full">
                                    <div className="h-px w-full max-w-[280px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6 relative">
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-[2px] bg-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
                                    </div>
                                    <span className="text-sm sm:text-base text-white/70 font-medium tracking-wide leading-relaxed text-center px-6 max-w-[400px]">
                                        Full Stack Developer & Technical Architect crafting high-performance digital interfaces.
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-8 gap-x-6 w-full mt-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-[7px] font-mono text-white-500/30 tracking-[0.4em] uppercase">LOCATION</span>
                                        <span className="text-xs font-bold tracking-[0.2em] text-white/90">INDIA // IN</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-[7px] font-mono text-white-500/30 tracking-[0.4em] uppercase">STATUS</span>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="size-1 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                            <span className="text-xs font-bold tracking-[0.2em] text-emerald-400/80 uppercase">Active</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center col-span-2 w-full gap-4 pt-6 border-t border-white/5">
                                        <span className="text-[7px] font-mono text-purple-500/30 tracking-[0.4em] uppercase">TECH_STACK</span>
                                        <div className="flex flex-wrap justify-center gap-2 w-full">
                                            {['REACT', 'NODE.JS', 'NEXT.JS', 'THREE.JS'].map(tech => (
                                                <span key={tech} className="text-[8px] font-mono px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white/40 uppercase tracking-widest">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Structured Link Grid (Scrollable) */}
                            <div className="flex flex-col w-full flex-grow overflow-y-auto mb-4 custom-scrollbar relative z-10 px-2">
                                {NAV_LINKS.map((link, i) => (
                                    <div key={link.id} className="w-full">
                                        <motion.a
                                            href={`#${link.id}`}
                                            onClick={e => handleNavClick(e, link.id, setMobileOpen)}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (i * 0.08), ease: "easeOut" }}
                                            className="w-full flex flex-col items-center py-5 sm:py-6 group active:bg-white/5 transition-all relative text-center"
                                        >
                                            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-0 bg-purple-500 group-hover:h-[60%] transition-all duration-300 rounded-r" />
                                            <span className="text-[7.5px] font-mono text-white/10 tracking-[0.5em] uppercase mb-4 text-center">
                                                PROCESS_0{i + 1}
                                            </span>
                                            <span className="text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase text-white/30 group-hover:text-white transition-all duration-300 text-center">
                                                {link.label}
                                            </span>
                                        </motion.a>
                                        <div className="w-full h-px bg-white/5" />
                                    </div>
                                ))}
                                {/* Resume Section (Compact) */}
                                <div className="w-full pt-8 pb-4">
                                    <motion.a
                                        href="https://drive.google.com/file/d/1PNoOM-hgEHcUPdvFzyM4crW9Q93exKFY/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (NAV_LINKS.length * 0.08), ease: "easeOut" }}
                                        className="w-full flex flex-col items-center justify-center py-8 group px-8 overflow-hidden relative rounded-[20px] border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors text-center mt-4"
                                    >
                                        <div className="flex flex-col items-center gap-2.5 relative z-10">
                                            <span className="text-[7.5px] font-mono text-indigo-400/30 tracking-[0.5em] uppercase text-center">

                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl sm:text-2xl font-black tracking-widest uppercase text-indigo-400 group-hover:text-indigo-300 transition-colors text-center">
                                                    Resume
                                                </span>
                                                <ArrowUpRight size={20} className="text-indigo-400 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform relative z-10" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-500" />
                                    </motion.a>
                                </div>
                            </div>
                            <div className="mt-auto shrink-0 w-full pt-10 sm:pt-12 border-t border-white/5 relative z-10 flex flex-col items-center">
                                <div className="flex flex-col items-center gap-6 mb-8">
                                    <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.4em] uppercase bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                        <Clock size={12} className="text-purple-400" />

                                    </div>
                                    <div className="flex gap-10">
                                        <a href="https://github.com/kapildev1012" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-all hover:scale-125">
                                            <Github size={20} />
                                        </a>
                                        <a href="https://linkedin.com/in/kapil-dev-1012" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-all hover:scale-125">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href="https://instagram.com/kapildev_10" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-all hover:scale-125">
                                            <Instagram size={20} />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-3 font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.5em] uppercase">
                                    <div className="flex justify-center gap-8">
                                        <div className="flex items-center gap-2.5"><Wifi size={10} className="text-green-500/50" /> <span>TX_STABLE</span></div>
                                        <div className="flex items-center gap-2.5"><Battery size={10} className="text-blue-500/50" /> <span>PWR_98%</span></div>
                                    </div>
                                    <span className="mt-1 text-white/10">PRO_VER: 2.0.4 // HUD_READY</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}