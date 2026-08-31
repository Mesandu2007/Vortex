
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    getUserDashboard
} from "@/app/services/user/userService";


export default function UserDashboardPage() {

    const router = useRouter();


    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");


                const data =
                    await getUserDashboard();


                setDashboard(data);

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );


                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {

                    localStorage.removeItem(
                        "usertoken"
                    );

                    router.push(
                        "/user/login"
                    );

                    return;

                }


                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, [router]);


    const getStatusClass = (status) => {

        if (status === "ACTIVE") {

            return "bg-green-100 text-green-700";

        }


        if (status === "COMPLETED") {

            return "bg-blue-100 text-blue-700";

        }


        if (status === "DRAFT") {

            return "bg-yellow-100 text-yellow-700";

        }


        return "bg-gray-100 text-gray-700";

    };


    if (loading) {

        return (

            <div className="min-h-full bg-gray-50 flex items-center justify-center px-4">

                <p className="text-gray-500 text-lg">
                    Loading dashboard...
                </p>

            </div>

        );

    }


    if (error || !dashboard) {

        return (

            <div className="min-h-full bg-gray-50 px-4 sm:px-6 py-8">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                        {error ||
                            "Unable to load dashboard."}

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-full bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

                    <div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">

                            Welcome,{" "}

                            {dashboard.fullName}

                        </h1>


                        <p className="text-gray-500 mt-1 break-all">

                            {dashboard.email}

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/user/join-election"
                            )
                        }
                        className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        + Join Election
                    </button>

                </div>


                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Joined Elections
                        </p>


                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">

                            {dashboard.totalJoinedElections}

                        </p>

                    </div>


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Active Elections
                        </p>


                        <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">

                            {dashboard.activeElections}

                        </p>

                    </div>


                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sm:p-6">

                        <p className="text-sm text-gray-500">
                            Completed Elections
                        </p>


                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">

                            {dashboard.completedElections}

                        </p>

                    </div>

                </div>


                {/* ==========================================
                    JOINED ELECTIONS
                ========================================== */}

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">


                    <div className="px-5 sm:px-6 py-5 border-b border-gray-100">

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            Your Joined Elections
                        </h2>


                        <p className="text-sm text-gray-500 mt-1">
                            Elections you have joined.
                        </p>

                    </div>


                    {dashboard.joinedElections &&
                    dashboard.joinedElections.length > 0 ? (

                        <div className="divide-y divide-gray-100">

                            {dashboard.joinedElections.map(
                                (election) => (

                                    <div
                                        key={election.id}
                                        className="p-5 sm:p-6 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


                                            

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-wrap items-center gap-3">

                                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">

                                                        {election.title}

                                                    </h3>


                                                    <span
                                                        className={`
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-xs
                                                            font-semibold
                                                            whitespace-nowrap
                                                            ${getStatusClass(
                                                                election.status
                                                            )}
                                                        `}
                                                    >
                                                        {election.status}
                                                    </span>

                                                </div>


                                                <p className="text-gray-500 mt-1">

                                                    {election.positionName}

                                                </p>


                                                <div className="mt-3 space-y-1 text-sm text-gray-500">

                                                    <p>

                                                        <span className="font-medium text-gray-700">
                                                            Starts:
                                                        </span>{" "}

                                                        {new Date(
                                                            election.startDate
                                                        ).toLocaleString()}

                                                    </p>


                                                    <p>

                                                        <span className="font-medium text-gray-700">
                                                            Ends:
                                                        </span>{" "}

                                                        {new Date(
                                                            election.endDate
                                                        ).toLocaleString()}

                                                    </p>

                                                </div>


                                               

                                                <div className="mt-4">

                                                    {election.hasVoted ? (

                                                        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm">

                                                            <span className="font-semibold">
                                                                ✓ Voted
                                                            </span>


                                                            {election.votedCandidateName && (

                                                                <>

                                                                    <span>
                                                                        for
                                                                    </span>


                                                                    <span className="font-semibold">

                                                                        {
                                                                            election.votedCandidateName
                                                                        }

                                                                    </span>

                                                                </>

                                                            )}

                                                        </div>

                                                    ) : (

                                                        <div className="inline-flex items-center px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700 text-sm font-medium">

                                                            Not voted yet

                                                        </div>

                                                    )}

                                                </div>

                                            </div>


                                        

                                            <div className="w-full lg:w-auto flex-shrink-0">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        router.push(
                                                            "/user/join-election"
                                                        )
                                                    }
                                                    className="w-full lg:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                                >

                                                    {election.hasVoted
                                                        ? "View Election"
                                                        : "View & Vote"
                                                    }

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="p-8 sm:p-12 text-center">


                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">

                                <span className="text-2xl text-gray-400">
                                    +
                                </span>

                            </div>


                            <h3 className="text-lg font-semibold text-gray-900">
                                No joined elections
                            </h3>


                            <p className="text-sm sm:text-base text-gray-500 mt-2 mb-5">
                                Join an election using the access code provided by your organizer.
                            </p>


                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/user/join-election"
                                    )
                                }
                                className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Join an Election
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

