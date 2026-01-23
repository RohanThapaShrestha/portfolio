"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
    {
        date: "Jun 2024 - Present",
        title: "Security Analyst",
        company: "Monal Tech",
        location: "Chabahil-7, Nepal",
        points: [
            "Conduct Penetration Testing and Vulnerability Assessments on client networks and applications.",
            "Perform forensic analysis of cryptocurrency transactions using Chainalysis to trace fraud and ransomware.",
            "Draft comprehensive VAPT reports with risk assessments and remediation plans.",
            "Train team members and investigate security incidents and threats.",
        ],
    },
    {
        date: "Nov 2023 - Feb 2024",
        title: "Front-End Developer (Intern)",
        company: "Coding Glory",
        location: "Kathmandu",
        points: [
            "Built responsive web pages using HTML5, CSS3, and React.js.",
            "Collaborated on UI components and optimized website performance.",
            "Gained hands-on experience with Git/GitHub and deployment processes.",
        ],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".timeline-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: -30,
                duration: 0.7,
                stagger: 0.3,
                ease: "power2.out",
            });

            gsap.from(".training-block", {
                scrollTrigger: {
                    trigger: ".training-block",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-cyan-400">03.</span>
                    Experience
                    <span className="flex-1 h-px bg-slate-800 max-w-xs" />
                </h2>

                {/* Timeline */}
                <div className="relative border-l-2 border-slate-800 ml-4">
                    {experienceData.map((exp, index) => (
                        <div key={index} className="timeline-item relative pl-10 pb-12 last:pb-0">
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-1 w-4 h-4 bg-cyan-400 rounded-full timeline-dot" />

                            {/* Date */}
                            <span className="font-heading text-cyan-400 text-sm">{exp.date}</span>

                            {/* Content */}
                            <h3 className="font-heading text-xl font-bold text-slate-100 mt-2">
                                {exp.title}
                            </h3>
                            <h4 className="text-slate-400 mb-4">
                                {exp.company} | {exp.location}
                            </h4>

                            <ul className="space-y-3">
                                {exp.points.map((point, i) => (
                                    <li key={i} className="flex gap-3 text-slate-400 text-sm">
                                        <span className="text-cyan-400 mt-1">▹</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Training Block */}
                <div className="training-block mt-12 p-6 bg-cyan-400/5 border border-dashed border-cyan-400/40 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <svg
                            className="w-6 h-6 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>
                        <h3 className="font-heading text-lg font-bold text-cyan-400">
                            Specialized Training
                        </h3>
                    </div>

                    <p className="font-medium text-slate-100">
                        Cybersecurity & VAPT Intensive (7-12 Dec 2025)
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                        Nepal Electricity Authority (NEA) | Pulchowk, Lalitpur
                    </p>

                    <div className="text-slate-400 text-sm space-y-2">
                        <p>
                            Completed an intensive 7-day cybersecurity training program focused on foundational
                            VAPT concepts and hands-on lab exposure. The curriculum covered network security fundamentals,
                            service enumeration techniques, and basic vulnerability identification methodologies.
                        </p>
                        <p>
                            Gained practical experience with web application security concepts aligned with OWASP Top 10,
                            including vulnerability validation in controlled lab environments using industry-standard tools
                            such as Nmap, Burp Suite, Nikto, and Wireshark.
                        </p>
                        <p className="text-cyan-400/80">
                            <strong>Volunteer Role:</strong> Assisted coworkers during hands-on training sessions,
                            helping participants understand networking concepts, tool usage, and troubleshooting
                            common lab environment issues.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
