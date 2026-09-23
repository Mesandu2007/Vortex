"use client";

import UserNavbar from "@/app/components/UserNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProtectedLayout({ children }) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");


        if (!token) {
            router.replace("/user/login");
            return;
        }


        if (role !== "USER") {
            router.replace("/admin/dashboard");
            return;
        }

    
        setChecking(false);
    }, [router]);

    
    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <UserNavbar />

            <main className="flex-1">
                {children}
            </main>

        </div>
    );
}