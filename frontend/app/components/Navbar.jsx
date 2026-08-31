
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    getAdminProfile
} from "@/app/services/admin/authentication";


export default function Navbar() {

    const router = useRouter();

    const [admin, setAdmin] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {

        const loadAdminProfile = async () => {

            try {

                const data =
                    await getAdminProfile();

                setAdmin(data);

            } catch (error) {

                console.error(
                    "Failed to load admin profile:",
                    error
                );

            }

        };


        loadAdminProfile();

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("usertoken");

        router.push("/admin/login");

    };


    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (

        <nav className="bg-white border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="h-20 flex items-center justify-between">


                    <Link
                        href="/admin/dashboard"
                        onClick={closeMenu}
                        className="text-xl sm:text-2xl font-bold text-gray-900"
                    >
                        Voting System
                    </Link>


                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            href="/admin/dashboard"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/elections"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Elections
                        </Link>

                    </div>


                    <div className="hidden md:flex items-center gap-5">

                        {admin && (

                            <div className="text-right">

                                <p className="text-sm font-semibold text-gray-900">
                                    {admin.fullName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {admin.email}
                                </p>

                            </div>

                        )}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>


                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                    >

                        {menuOpen ? (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        ) : (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>

                        )}

                    </button>

                </div>


                {menuOpen && (

                    <div className="md:hidden border-t border-gray-100 py-4">

                        <div className="flex flex-col gap-2">

                            <Link
                                href="/admin/dashboard"
                                onClick={closeMenu}
                                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>


                            <Link
                                href="/admin/elections"
                                onClick={closeMenu}
                                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition"
                            >
                                Elections
                            </Link>


                            {admin && (

                                <div className="border-t border-gray-100 mt-2 pt-4 px-4">

                                    <p className="text-sm font-semibold text-gray-900">
                                        {admin.fullName}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {admin.email}
                                    </p>

                                </div>

                            )}


                            <button
                                type="button"
                                onClick={handleLogout}
                                className="mt-2 mx-4 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </nav>

    );

}

