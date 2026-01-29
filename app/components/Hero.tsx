"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const [displayText, setDisplayText] = useState("Rohan Thapa Shrestha");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([".hero-terminal", ".hero-name", ".hero-title", ".hero-bio", ".hero-btn"], {
                opacity: 0,
                y: 20,
            });

            // Timeline for hero entrance
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(".hero-terminal", {
                opacity: 1,
                y: 0,
                duration: 0.6,
            })
                .to(
                    ".hero-name",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    "-=0.3"
                )
                .to(
                    ".hero-title",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    "-=0.4"
                )
                .to(
                    ".hero-bio",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    "-=0.3"
                )
                .to(
                    ".hero-btn",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.15,
                    },
                    "-=0.2"
                );
        }, heroRef);

        return () => {
            ctx.revert();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Glitch effect on hover
    const handleMouseEnter = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        const originalText = "Rohan Thapa Shrestha";
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
        let iteration = 0;

        intervalRef.current = setInterval(() => {
            setDisplayText(
                originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= originalText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1.5;
        }, 20);
    };

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen flex items-center justify-center pt-20 px-6"
        >
            <div className="max-w-4xl">
                {/* Terminal Text */}
                <span className="hero-terminal font-heading text-purple-400 text-sm md:text-base mb-4 block cursor-blink">
                    &gt; initializing_portfolio...
                </span>

                {/* Name */}
                <h1
                    ref={nameRef}
                    onMouseEnter={handleMouseEnter}
                    className="hero-name font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-4 cursor-default"
                >
                    {displayText}
                </h1>

                {/* Title */}
                <h2 className="hero-title font-heading text-xl md:text-3xl text-slate-400 mb-6">
                    Security Analyst |{" "}
                    <span className="gradient-text">VAPT & Forensics</span>
                </h2>

                {/* Bio */}
                <p className="hero-bio font-body text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                    Security Analyst specializing in Vulnerability Assessment &
                    Penetration Testing, Incident Response, and Blockchain Forensics.
                    Focusing on securing networks and tracing digital threats.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="#projects"
                        className="hero-btn btn-cyber px-6 py-3 bg-purple-400/10 border border-purple-400 text-purple-400 rounded font-heading text-sm hover:bg-purple-400/20 transition-all"
                    >
                        View Case Studies
                    </Link>
                    <Link
                        href="#contact"
                        className="hero-btn px-6 py-3 bg-slate-800 text-slate-100 rounded font-heading text-sm hover:bg-slate-700 transition-all"
                    >
                        Get in Touch
                    </Link>
                    <a
                        href="/resume.pdf"
                        download
                        className="hero-btn px-6 py-3 text-slate-400 hover:text-purple-400 transition-colors font-heading text-sm flex items-center gap-2"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                        Download CV
                    </a>
                </div>
            </div>
        </section>
    );
}

