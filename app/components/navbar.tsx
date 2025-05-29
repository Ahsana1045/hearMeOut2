"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    if (!session?.user) return null;

    return (
        <nav style={{ width: "100%", background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0.5rem 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "flex-end", height: 56, position: "relative" }}>
                <div style={{ position: "relative" }} ref={dropdownRef}>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.5rem 1rem", borderRadius: 6, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 500 }}
                        aria-haspopup="true"
                        aria-expanded={open}
                    >
                        <span style={{ fontWeight: 600 }}>{session.user.name || session.user.email}</span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {open && (
                        <div style={{ position: "absolute", right: 0, top: 40, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: 180, zIndex: 10 }}>
                            <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", fontWeight: 500 }}>{session.user.name || session.user.email}</div>
                            <Link href="/profile" style={{ display: "block", padding: "0.75rem 1rem", color: "#2563eb", textDecoration: "none", fontWeight: 500 }} onClick={() => setOpen(false)}>
                                My Profile
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                style={{ width: "100%", textAlign: "left", padding: "0.75rem 1rem", background: "none", border: "none", color: "#dc2626", fontWeight: 500, cursor: "pointer" }}
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
