"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Navbar animation ONLY on load
        gsap.from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, []); // Empty dependency array for mount-only animation

    useEffect(() => {
        // Scroll listener for navbar background and closing mobile menu
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
    ];

    return (
        <>
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
                        className="nav-item font-heading text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors z-[60]"
                    >
                        Rohan Thapa Shrestha
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <li key={index} className="nav-item">
                                <Link
                                    href={link.href}
                                    className="relative text-slate-400 hover:text-purple-400 transition-colors font-medium py-1 group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item">
                            <Link
                                href="#contact"
                                className="btn-cyber relative px-5 py-2 border border-purple-400 text-purple-400 rounded hover:bg-purple-400 hover:text-slate-950 transition-all duration-200 font-heading text-sm"
                            >
                                Contact Me
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 z-[60] relative group px-2 py-1"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-slate-100 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-purple-400" : "group-hover:bg-purple-400"
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-slate-100 transition-opacity duration-300 ${isOpen ? "opacity-0" : "group-hover:bg-purple-400"
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-slate-100 transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-purple-400" : "group-hover:bg-purple-400"
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-[55] bg-slate-950/98 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="relative text-2xl text-slate-100 hover:text-purple-400 transition-colors group px-4 py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
                <Link
                    href="#contact"
                    className="relative px-8 py-3 border border-purple-400 text-purple-400 rounded hover:bg-purple-400 hover:text-slate-950 transition-all duration-300 text-lg font-heading"
                    onClick={() => setIsOpen(false)}
                >
                    Contact Me
                </Link>
            </div>
        </>
    );
}

