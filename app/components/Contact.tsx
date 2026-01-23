"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formState.name || !formState.email || !formState.message) {
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formState.email)) {
            setStatus("error");
            return;
        }

        setStatus("sending");

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });

            // Reset status after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <section ref={sectionRef} id="contact" className="py-24 px-6">
            <div className="max-w-xl mx-auto contact-content">
                {/* Section Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-center">
                    <span className="text-cyan-400">05.</span> Get In Touch
                </h2>

                <p className="text-slate-400 text-center mb-12">
                    Whether you have a question, a project idea, or just want to say hi —
                    my inbox is always open!
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-heading text-sm text-cyan-400 mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formState.name}
                            onChange={(e) =>
                                setFormState({ ...formState, name: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-body focus:border-cyan-400 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block font-heading text-sm text-cyan-400 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={(e) =>
                                setFormState({ ...formState, email: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-body focus:border-cyan-400 transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block font-heading text-sm text-cyan-400 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            value={formState.message}
                            onChange={(e) =>
                                setFormState({ ...formState, message: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-body focus:border-cyan-400 transition-colors resize-none"
                            placeholder="Your message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className={`w-full py-4 rounded-lg font-heading text-sm transition-all btn-cyber ${status === "success"
                            ? "bg-emerald-500 text-slate-900"
                            : status === "error"
                                ? "bg-red-500/20 text-red-400 border border-red-500"
                                : "bg-cyan-400/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                            }`}
                    >
                        {status === "idle" && "Send Message"}
                        {status === "sending" && "Sending..."}
                        {status === "success" && "Message Sent! ✓"}
                        {status === "error" && "Invalid Email Format"}
                    </button>
                </form>

                {/* Contact Info */}
                <div className="mt-12 text-center space-y-6 text-slate-500 text-sm">
                    <div className="space-y-3">
                        <p className="flex items-center justify-center gap-2">
                            <svg
                                className="w-4 h-4 text-cyan-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            rohanthapashrestha@gmail.com
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            <svg
                                className="w-4 h-4 text-cyan-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Madhyapur Thimi, Bode-8
                        </p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                        {/* Facebook */}
                        <a
                            href="https://facebook.com/RohanThapaShrestha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-cyan-400 transition-colors"
                            aria-label="Facebook"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/Rohan_Thapa_Sth"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-pink-400 transition-colors"
                            aria-label="Instagram"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/in/RohanThapaShrestha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-blue-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/RohanThapaShrestha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-slate-100 transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
