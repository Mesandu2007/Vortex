"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        
        if (!token) {
            router.replace("/admin/login");
            return;
        }

        
        if (role !== "ADMIN") {
            router.replace("/user/dashboard");
            return;
        }

        // Authentication passed
        setChecking(false);
    }, [router]);

    // Prevent protected content from briefly appearing
    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <Navbar />

            <main className="flex-1">
                {children}
            </main>

        </div>
    );
}