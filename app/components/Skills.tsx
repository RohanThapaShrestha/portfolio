"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "VAPT",
        description: "Comprehensive vulnerability assessment and penetration testing on networks, web apps, and mobile applications.",
        tools: ["Burp Suite", "Nmap", "Nessus", "Metasploit", "OWASP ZAP"],
        color: "cyan",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: "Blockchain & Forensics",
        description: "Tracing illicit crypto activities, ransomware payments, and digital evidence analysis for investigations.",
        tools: ["Chainalysis", "Chain Reactor", "Autopsy", "Magnet AXIOM"],
        color: "emerald",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
        ),
        title: "Network Security",
        description: "Deep understanding of protocols, traffic analysis, and network defense strategies.",
        tools: ["Wireshark", "TCP/IP & OSI", "Traffic Analysis", "Firewalls"],
        color: "purple",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: "SIEM & Monitoring",
        description: "Log analysis, alert rule creation, and incident response using enterprise SIEM platforms.",
        tools: ["Wazuh", "Logpoint", "Alert Rules", "Splunk (Basic)"],
        color: "orange",
    },
];

const colorClasses: { [key: string]: { bg: string; text: string; border: string } } = {
    cyan: { bg: "bg-cyan-400/10", text: "text-cyan-400", border: "border-cyan-400/30" },
    emerald: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "border-emerald-400/30" },
    purple: { bg: "bg-purple-400/10", text: "text-purple-400", border: "border-purple-400/30" },
    orange: { bg: "bg-orange-400/10", text: "text-orange-400", border: "border-orange-400/30" },
};

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll(".skill-card");
            if (cards) {
                gsap.set(cards, { opacity: 0, y: 50 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 80%",
                    onEnter: () => {
                        gsap.to(cards, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.12,
                            ease: "power2.out",
                        });
                    },
                    once: true,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="py-24 px-6 bg-slate-900/50"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-cyan-400">02.</span>
                    Technical Arsenal
                    <span className="flex-1 h-px bg-slate-800 max-w-xs" />
                </h2>

                {/* Skills Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            className={`skill-card card-glow bg-slate-900 p-8 rounded-xl border ${colorClasses[skill.color].border}`}
                        >
                            {/* Icon */}
                            <div className={`${colorClasses[skill.color].text} mb-6`}>
                                {skill.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-xl font-bold text-slate-100 mb-3">
                                {skill.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                {skill.description}
                            </p>

                            {/* Tools */}
                            <div className="flex flex-wrap gap-2">
                                {skill.tools.map((tool, i) => (
                                    <span
                                        key={i}
                                        className={`font-heading text-xs px-3 py-1 rounded ${colorClasses[skill.color].bg} ${colorClasses[skill.color].text}`}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
