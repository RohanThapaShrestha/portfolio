"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Navbar animation on load
        gsap.from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        });

        // Scroll listener for navbar background
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="nav-item font-heading text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    Rohan Thapa Shrestha
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            <Link
                                href={link.href}
                                className="text-slate-400 hover:text-cyan-400 transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item">
                        <Link
                            href="#contact"
                            className="btn-cyber px-5 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-all font-heading text-sm"
                        >
                            Contact Me
                        </Link>
                    </li>
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-6 h-0.5 bg-slate-100 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-slate-100 transition-opacity ${isOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-slate-100 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </button>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed inset-0 bg-slate-950/98 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-2xl text-slate-100 hover:text-cyan-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </nav>
    );
}
