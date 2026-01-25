import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";


const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Rohan Thapa Shrestha | Security Analyst",
    description:
        "Security Analyst specializing in VAPT, Incident Response, and Blockchain Forensics. Portfolio showcasing cybersecurity projects and expertise.",
    keywords: [
        "Security Analyst",
        "VAPT",
        "Penetration Testing",
        "Blockchain Forensics",
        "Cybersecurity",
        "Nepal",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jetbrainsMono.variable} ${plusJakartaSans.variable} antialiased bg-slate-950 text-slate-100`}>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
