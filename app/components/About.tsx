"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
            });

            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: ".stat-card",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: 30,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-24 px-6"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-purple-400">01.</span>
                    About Me
                    <span className="flex-1 h-px bg-slate-800 max-w-xs" />
                </h2>

                <div className="grid md:grid-cols-5 gap-12">
                    {/* Text Content */}
                    <div className="about-content md:col-span-3 space-y-6 text-slate-400 font-body text-lg leading-relaxed">
                        <p>
                            Hello! I&apos;m Rohan, a Security Analyst based in{" "}
                            <span className="text-purple-400">Kathmandu, Nepal</span>. My
                            journey into cybersecurity began with a foundation in Computer
                            Science and front-end development, which gave me a unique
                            perspective on how applications are built—and how they can be
                            broken.
                        </p>
                        <p>
                            Currently working at{" "}
                            <span className="text-purple-400 font-medium">Monal Tech</span>, I
                            spend my days conducting VAPT on networks and applications,
                            investigating security incidents, and performing forensic analysis
                            on blockchain transactions.
                        </p>
                        <p>
                            I am passionate about{" "}
                            <span className="text-slate-100">&quot;learning by doing&quot;</span>,
                            constantly practicing in labs and simulations to stay ahead of
                            emerging threats.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="stat-card bg-slate-900 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="font-heading text-purple-400 text-sm mb-2">
                                Education
                            </h3>
                            <p className="text-slate-100 font-medium">BCS (Hons)</p>
                            <p className="text-slate-400 text-sm">
                                Sunway College of Kathmandu (2021-24)
                            </p>
                        </div>

                        <div className="stat-card bg-slate-900 p-6 rounded-lg border-l-4 border-emerald-400">
                            <h3 className="font-heading text-emerald-400 text-sm mb-2">
                                Focus Areas
                            </h3>
                            <p className="text-slate-100 font-medium">
                                VAPT • SOC • Blockchain Forensics
                            </p>
                        </div>

                        <div className="stat-card bg-slate-900 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="font-heading text-purple-400 text-sm mb-2">
                                Experience
                            </h3>
                            <p className="text-slate-100 font-medium">Security Analyst</p>
                            <p className="text-slate-400 text-sm">Monal Tech (Jun 2024 - Present)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

