"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        icon: "folder",
        title: "Web App VAPT",
        description:
            "Methodology-focused case study on testing a mock e-commerce application. Identified SQL Injection and XSS vulnerabilities using Burp Suite.",
        tags: ["OWASP Top 10", "Burp Suite", "SQLMap"],
    },
    {
        icon: "folder",
        title: "Crypto Fraud Investigation",
        description:
            "Simulated forensic investigation of a ransomware payment. Traced transaction hops using blockchain explorers to identify the destination wallet.",
        tags: ["Chainalysis", "Blockchain", "Forensics"],
    },
    {
        icon: "folder",
        title: "SIEM Alert Detection",
        description:
            "Implemented Wazuh agents to detect SSH brute force attacks. Configured custom rules and dashboards to visualize attack patterns.",
        tags: ["Wazuh", "Elastic Stack", "Linux"],
    },
    {
        icon: "robot",
        title: "Security Automation",
        description:
            "Created an automated workflow using n8n to parse phishing emails and check attachments against VirusTotal API.",
        tags: ["n8n", "VirusTotal API", "Automation"],
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll(".project-card");
            if (cards) {
                gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 80%",
                    onEnter: () => {
                        gsap.to(cards, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
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
            id="projects"
            className="py-24 px-6 bg-slate-900/50"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-cyan-400">04.</span>
                    Case Studies & Labs
                    <span className="flex-1 h-px bg-slate-800 max-w-xs" />
                </h2>

                {/* Projects Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className="project-card card-glow bg-slate-900 p-8 rounded-xl border border-slate-800 group"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                {project.icon === "folder" ? (
                                    <svg
                                        className="w-10 h-10 text-cyan-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-10 h-10 text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[80px]">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 font-heading text-xs text-slate-500">
                                {project.tags.map((tag, i) => (
                                    <span key={i}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
