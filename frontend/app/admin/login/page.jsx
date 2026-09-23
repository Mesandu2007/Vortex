"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    loginAdmin
} from "@/app/services/admin/authentication";

export default function AdminLoginPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            const data = await loginAdmin(formData);

            if (data.token) {

                // Store JWT
                localStorage.setItem(
                    "token",
                    data.token
                );

                // Store Admin role
                localStorage.setItem(
                    "role",
                    "ADMIN"
                );

                router.push("/admin/dashboard");

            } else {

                setError("Login failed. No token received.");

            }

        } catch (err) {

            console.error(
                "Login error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                    <div className="text-center mb-8">

                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-600 flex items-center justify-center">

                            <span className="text-white text-xl font-bold">
                                VS
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Login
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Sign in to manage your elections
                        </p>

                    </div>


                    {error && (

                        <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200">

                            <p className="text-sm text-red-700">
                                {error}
                            </p>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 pr-20 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                    </form>

                </div>


                <p className="text-center text-xs text-gray-400 mt-6">
                    Secure Election Management System
                </p>

            </div>

        </div>

    );
}