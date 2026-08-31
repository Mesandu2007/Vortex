
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAdminDashboardData } from "@/app/services/admin/dashboard";


export default function AdminDashboardPage() {

    const router = useRouter();


    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getAdminDashboardData();

                setDashboardData(data);

            } catch (error) {

                console.error("Dashboard error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard data."
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);



    if (loading) {

        return (

            <div className="min-h-full bg-gray-50 flex items-center justify-center px-4">

                <p className="text-gray-500 text-base sm:text-lg text-center">
                    Loading dashboard...
                </p>

            </div>

        );

    }


    if (error) {

        return (

            <div className="min-h-full bg-gray-50 px-4 sm:px-6 py-6 sm:py-10">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-red-100 border border-red-200 text-red-700 rounded-lg p-4 text-sm sm:text-base">
                        {error}
                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-full bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">


                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                    <div className="min-w-0">

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1 text-sm sm:text-base">
                            Manage your elections and monitor their status.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            router.push("/admin/elections")
                        }
                        className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Manage Elections
                    </button>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Total Elections
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                            {dashboardData.totalElections}
                        </h2>

                    </div>


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Active Elections
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                            {dashboardData.activeElections}
                        </h2>

                    </div>


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Draft Elections
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">
                            {dashboardData.draftElections}
                        </h2>

                    </div>


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Completed Elections
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
                            {dashboardData.completedElections}
                        </h2>

                    </div>

                </div>


                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">


                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-gray-100">

                        <div className="min-w-0">

                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                Recent Elections
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Your five most recent elections
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                router.push("/admin/elections")
                            }
                            className="self-start sm:self-auto text-blue-600 font-medium hover:underline"
                        >
                            View All
                        </button>

                    </div>


                    {dashboardData.recentElections &&
                    dashboardData.recentElections.length > 0 ? (

                        <div className="divide-y divide-gray-100">

                            {dashboardData.recentElections.map(
                                (election) => (

                                    <div
                                        key={election.id}
                                        className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
                                    >


                                        <div className="min-w-0">

                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                                                {election.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1 break-words">
                                                {election.positionName}
                                            </p>

                                            <p className="text-sm text-gray-400 mt-2 break-words">
                                                {election.startDate}
                                            </p>

                                        </div>


                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    whitespace-nowrap

                                                    ${
                                                        election.status === "ACTIVE"
                                                            ? "bg-green-100 text-green-700"
                                                            : election.status === "DRAFT"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }
                                                `}
                                            >
                                                {election.status}
                                            </span>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/elections/${election.id}`
                                                    )
                                                }
                                                className="text-blue-600 font-medium hover:underline whitespace-nowrap"
                                            >
                                                View
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="p-8 sm:p-10 text-center">

                            <p className="text-gray-500 mb-4 text-sm sm:text-base">
                                You have not created any elections yet.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/admin/elections")
                                }
                                className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Create Election
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

