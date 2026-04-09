import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Rocket, Users, Monitor, MapPin, GraduationCap, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { WordRotate } from "@/components/ui/word-rotate";
import { Highlighter } from "@/components/ui/highlighter";
import Magnet from './Magnet';
import TiltCard from './TiltCard';

function Counter({ value, suffix }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        if (!inView) return;

        const ctrl = animate(0, value, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
            },
        });

        return () => ctrl.stop();
    }, [inView, value, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

const SKILLS = [
    'React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion', 'Node.js',
    'Express.js', 'MongoDB', 'MySQL', 'Python', 'AI/ML'
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const GRAD = {
    background: 'linear-gradient(135deg, #e5e5e5, #ffffff, #a3a3a3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
};

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for background text
    const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityBackground = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

    // Mouse Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 50 });

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <section
            id="about"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full overflow-hidden bg-[#0c1120]"
        >
            {/* Immersive Spotlight Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
                    )
                }}
            />

            {/* Background Kinetic Typography */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-20 overflow-hidden">
                <motion.h2
                    style={{ x: xLeft, opacity: opacityBackground }}
                    className="text-4xl md:text-[10rem] font-black text-white/5 md:text-white whitespace-nowrap leading-none select-none uppercase overflow-hidden"
                >
                    Creative Engineer
                </motion.h2>
                <motion.h2
                    style={{ x: xRight, opacity: opacityBackground }}
                    className="text-4xl md:text-[10rem] font-black text-white/5 md:text-white whitespace-nowrap leading-none select-none uppercase self-end overflow-hidden"
                >
                    MERN Specialist
                </motion.h2>
            </div>

            {/* Geometric Orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 90, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -45, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"
            />

            <div className="relative z-10 w-full section-wrap flex flex-col items-center">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="mb-20 flex flex-col items-center text-center max-w-4xl"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <Sparkles size={14} className="text-indigo-400" />
                        <span className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">Discovery</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[0.9] mb-30 md:mb-32">
                        Get to know <span style={GRAD}>Me</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-white/60 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                        Innovative Full-Stack Software Engineer (MERN) specializing in building scalable, high-performance web applications and enterprise solutions.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10 p-0 relative overflow-hidden group/left"
                        >
                            {/* Subtle Inner Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/left:bg-indigo-500/10 transition-colors duration-700" />

                            <div className="space-y-2">
                                <h3 className="text-lg md:text-3xl font-bold text-white tracking-tight uppercase">
                                    I am a <span style={GRAD}>Creative</span>
                                </h3>
                                <WordRotate
                                    words={['Full-Stack Engineer', 'MERN Stack Expert', 'Founder at Zippin', 'Tech Solutionist']}
                                    className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                                    duration={3000}
                                />
                            </div>

                            <div className="space-y-8 text-white/70 leading-[1.8] text-base lg:text-lg">
                                <p>
                                    I'm a <span className="font-bold text-indigo-400">
                                        Full-Stack Software Engineer (MERN)
                                    </span>{' '}
                                    with strong expertise in building scalable web applications, e-commerce systems, and enterprise dashboards.
                                </p>
                                <p>
                                    As <span className="font-bold text-purple-400">
                                        Founder & Lead Developer at Zippin Full-Stack Solutions
                                    </span>, I've built multi-store inventory systems for food chains & cafés, gym management platforms with membership tiers, and Amazon-style e-commerce marketplaces.
                                </p>
                                <p>
                                    Currently pursuing <span className="font-bold text-pink-400">
                                        B.Tech in Computer Science & Engineering (2023 - 2027) at HPTU
                                    </span>, with proven track record leading college projects including AI attendance systems with facial recognition and virtual class platforms.
                                </p>
                            </div>

                            <div className="flex flex-col gap-8">
                                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
                                    {SKILLS.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            variants={fadeUp}
                                            whileHover={{ y: -3, backgroundColor: "rgba(129, 140, 248, 0.1)", borderColor: "rgba(129, 140, 248, 0.4)" }}
                                            className="px-4 py-2 text-xs font-semibold rounded-xl border border-white/5 text-white/40 bg-white/[0.03] transition-colors cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                <Magnet magnetStrength={4} padding={40}>
                                    <a
                                        href="#contact"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById('contact');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="inline-flex items-center gap-4 text-base font-bold text-indigo-400 hover:text-indigo-300 group transition-all duration-300"
                                    >
                                        Let's work together
                                        <div className="p-2 rounded-full border border-indigo-400 group-hover:bg-indigo-400/10 transition-colors">
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>
                                </Magnet>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                            {/* Experience Node */}
                            <div className="group relative p-0 transition-all duration-500 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">Experience</p>
                                        <div className="space-y-2">
                                            <p className="text-white text-2xl md:text-3xl font-bold tracking-tight">Founder & Lead Dev</p>
                                            <span className="inline-flex px-3 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                                                Active Agency
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 pt-6 border-t border-white/5">
                                        <p className="text-indigo-400 text-sm md:text-base font-bold">Zippin Full-Stack Solutions</p>
                                        <p className="text-white/30 text-[13px] font-medium italic tracking-wide">Jan 2023 – Present</p>
                                    </div>
                                </div>
                                {/* Corner Icon */}
                                <Briefcase className="absolute top-0 right-0 text-white/5 group-hover:text-indigo-500/20 transition-colors duration-500" size={40} />
                            </div>

                            {/* Education Node */}
                            <div className="group relative p-0 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">Education</p>
                                        <p className="text-white text-xl font-bold tracking-tight leading-[1.2]">B.Tech – CS & Engineering</p>
                                    </div>
                                    <div className="space-y-1.5 pt-6 border-t border-white/5">
                                        <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">HPTU, India</p>
                                        <p className="text-white/30 text-[11px] font-medium italic tracking-wide">2023 – 2027</p>
                                    </div>
                                </div>
                            </div>

                            {/* Geography Node */}
                            <div className="group relative p-0 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">Geography</p>
                                        <p className="text-white text-xl font-bold tracking-tight">Based in India</p>
                                    </div>
                                    <div className="space-y-4 pt-6 border-t border-white/5">
                                        <p className="text-pink-400 text-xs font-bold uppercase tracking-wider">Himachal Pradesh</p>
                                        <div className="inline-flex items-center gap-2 text-white/40 text-[11px] font-bold bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                                            Remote Available
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
