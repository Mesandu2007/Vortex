
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    getElectionStats,
    getElectionParticipants,
    getElectionResults
} from "@/app/services/admin/electionResults";


export default function AdminResultsPage() {

    const { id } = useParams();

    const router = useRouter();



    const [stats, setStats] = useState(null);

    const [loadingStats, setLoadingStats] = useState(true);

    const [statsError, setStatsError] = useState("");



    const [participants, setParticipants] = useState([]);

    const [loadingParticipants, setLoadingParticipants] =
        useState(true);

    const [participantsError, setParticipantsError] =
        useState("");




    const [finalResults, setFinalResults] = useState(null);

    const [loadingFinalResults, setLoadingFinalResults] =
        useState(false);

    const [finalResultsError, setFinalResultsError] =
        useState("");




    const loadStats = async () => {

        try {

            setLoadingStats(true);

            setStatsError("");

            const data =
                await getElectionStats(id);

            setStats(data);

        } catch (error) {

            console.error(
                "Failed to load statistics:",
                error
            );

            setStatsError(
                error.response?.data?.message ||
                "Failed to load election statistics."
            );

        } finally {

            setLoadingStats(false);

        }

    };



    const loadParticipants = async () => {

        try {

            setLoadingParticipants(true);

            setParticipantsError("");

            const data =
                await getElectionParticipants(id);

            setParticipants(data);

        } catch (error) {

            console.error(
                "Failed to load participants:",
                error
            );

            setParticipantsError(
                error.response?.data?.message ||
                "Failed to load participants."
            );

        } finally {

            setLoadingParticipants(false);

        }

    };




    const loadFinalResults = async () => {

        try {

            setLoadingFinalResults(true);

            setFinalResultsError("");

            const data =
                await getElectionResults(id);

            setFinalResults(data);

        } catch (error) {

            console.error(
                "Failed to load final results:",
                error
            );

            setFinalResultsError(
                error.response?.data?.message ||
                "Failed to load final results."
            );

        } finally {

            setLoadingFinalResults(false);

        }

    };



    useEffect(() => {

        if (!id) {
            return;
        }

        loadStats();

        loadParticipants();

    }, [id]);




    useEffect(() => {

        if (
            !stats ||
            stats.status !== "COMPLETED"
        ) {
            return;
        }

        loadFinalResults();

    }, [stats]);



    const totalParticipants =
        stats?.totalParticipants || 0;


    const totalVotes =
        stats?.totalVotes || 0;


    const didNotVote =
        Math.max(
            totalParticipants - totalVotes,
            0
        );


    const voterTurnout =
        totalParticipants > 0
            ? (totalVotes / totalParticipants) * 100
            : 0;


    const getVotePercentage = (voteCount) => {

        if (totalVotes === 0) {
            return 0;
        }

        return (
            (voteCount / totalVotes) *
            100
        );

    };




    const getStatusClass = (status) => {

        if (status === "ACTIVE") {

            return "bg-green-100 text-green-700";

        }

        if (status === "DRAFT") {

            return "bg-yellow-100 text-yellow-700";

        }

        if (status === "COMPLETED") {

            return "bg-blue-100 text-blue-700";

        }

        return "bg-gray-100 text-gray-700";

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loadingStats) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                    Loading results...
                </p>

            </div>

        );

    }


    // ==========================================
    // STATS ERROR
    // ==========================================

    if (statsError || !stats) {

        return (

            <div className="min-h-screen bg-gray-50 px-6 py-10">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
                        {statsError ||
                            "Unable to load election statistics."}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin/elections"
                            )
                        }
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Back to Elections
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-6 py-8">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="mb-8">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                `/admin/elections/${id}`
                            )
                        }
                        className="text-sm text-blue-600 hover:underline mb-3"
                    >
                        ← Back to Election
                    </button>


                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-900">
                                {stats.title}
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Election Results & Statistics
                            </p>

                        </div>


                        <span
                            className={`inline-flex self-start px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                                stats.status
                            )}`}
                        >
                            {stats.status}
                        </span>

                    </div>

                </div>


                {/* ==========================================
                    STATISTICS CARDS
                ========================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">


                    {/* Candidates */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <p className="text-sm text-gray-500">
                            Total Candidates
                        </p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            {stats.totalCandidates}
                        </p>

                    </div>


                    {/* Participants */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <p className="text-sm text-gray-500">
                            Total Participants
                        </p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            {totalParticipants}
                        </p>

                    </div>


                    {/* Votes */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <p className="text-sm text-gray-500">
                            Total Votes
                        </p>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {totalVotes}
                        </p>

                    </div>


                    {/* Turnout */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <p className="text-sm text-gray-500">
                            Voter Turnout
                        </p>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {voterTurnout.toFixed(1)}%
                        </p>

                    </div>

                </div>


                {/* ==========================================
                    VOTING OVERVIEW
                ========================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">


                    {/* Turnout */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Voting Activity
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Participation overview
                        </p>


                        <div className="mt-6">

                            <div className="flex justify-between text-sm mb-2">

                                <span className="text-gray-600">
                                    Votes Cast
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {totalVotes} / {totalParticipants}
                                </span>

                            </div>


                            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            voterTurnout,
                                            100
                                        )}%`
                                    }}
                                />

                            </div>


                            <div className="grid grid-cols-2 gap-4 mt-6">


                                <div className="bg-green-50 rounded-lg p-4">

                                    <p className="text-sm text-gray-500">
                                        Voted
                                    </p>

                                    <p className="text-2xl font-bold text-green-700 mt-1">
                                        {totalVotes}
                                    </p>

                                </div>


                                <div className="bg-gray-50 rounded-lg p-4">

                                    <p className="text-sm text-gray-500">
                                        Did Not Vote
                                    </p>

                                    <p className="text-2xl font-bold text-gray-700 mt-1">
                                        {didNotVote}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Candidate Distribution */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Candidate Vote Distribution
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Vote distribution by candidate
                        </p>


                        <div className="mt-5 space-y-5">

                            {stats.candidateResults &&
                            stats.candidateResults.length > 0 ? (

                                stats.candidateResults.map(
                                    (candidate) => {

                                        const percentage =
                                            getVotePercentage(
                                                candidate.voteCount
                                            );


                                        return (

                                            <div
                                                key={
                                                    candidate.candidateId
                                                }
                                            >

                                                <div className="flex items-center justify-between gap-4 mb-2">

                                                    <div className="flex items-center gap-3 min-w-0">

                                                        {candidate.imageUrl ? (

                                                            <img
                                                                src={
                                                                    candidate.imageUrl
                                                                }
                                                                alt={
                                                                    candidate.candidateName
                                                                }
                                                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                            />

                                                        ) : (

                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                                                N/A
                                                            </div>

                                                        )}


                                                        <span className="font-medium text-gray-800 truncate">
                                                            {
                                                                candidate.candidateName
                                                            }
                                                        </span>

                                                    </div>


                                                    <div className="text-right whitespace-nowrap">

                                                        <span className="font-semibold text-gray-900">
                                                            {
                                                                candidate.voteCount
                                                            }
                                                        </span>

                                                        <span className="text-sm text-gray-500 ml-2">
                                                            (
                                                            {percentage.toFixed(
                                                                1
                                                            )}
                                                            %)
                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{
                                                            width: `${Math.min(
                                                                percentage,
                                                                100
                                                            )}%`
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    }
                                )

                            ) : (

                                <p className="text-gray-500">
                                    No candidate results available.
                                </p>

                            )}

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    PARTICIPANTS
                ========================================== */}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">


                    <div className="px-6 py-5 border-b border-gray-100">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Participants
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Users who joined this election
                            </p>

                        </div>

                    </div>


                    {participantsError && (

                        <div className="mx-6 mt-5 p-4 bg-red-100 text-red-700 rounded-lg">
                            {participantsError}
                        </div>

                    )}


                    {loadingParticipants ? (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">
                                Loading participants...
                            </p>

                        </div>

                    ) : participants.length === 0 ? (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">
                                No participants have joined this election.
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Name
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            IIT ID
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Department
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Academic Year
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {participants.map(
                                        (participant) => (

                                            <tr
                                                key={
                                                    participant.userId
                                                }
                                                className="hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {
                                                        participant.fullName
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {
                                                        participant.email
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {
                                                        participant.iitId ||
                                                        "—"
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {
                                                        participant.department ||
                                                        "—"
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {
                                                        participant.academicYear ||
                                                        "—"
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* ==========================================
                    FINAL RESULTS
                ========================================== */}

                {stats.status === "COMPLETED" && (

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">


                        <div className="px-6 py-5 border-b border-gray-100">

                            <h2 className="text-xl font-bold text-gray-900">
                                Final Results
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Official election results
                            </p>

                        </div>


                        {loadingFinalResults ? (

                            <div className="p-10 text-center">

                                <p className="text-gray-500">
                                    Loading final results...
                                </p>

                            </div>

                        ) : finalResultsError ? (

                            <div className="p-6">

                                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                    {finalResultsError}
                                </div>

                            </div>

                        ) : finalResults ? (

                            <div className="p-6">


                                {/* Winner */}

                                {finalResults.winner && (

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">

                                        <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">
                                            Winner
                                        </p>


                                        <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                            {
                                                finalResults
                                                    .winner
                                                    .candidateName
                                            }
                                        </h3>


                                        <p className="text-gray-600 mt-2">

                                            {
                                                finalResults
                                                    .winner
                                                    .voteCount
                                            }{" "}
                                            votes

                                        </p>

                                    </div>

                                )}


                                {/* Final Total */}

                                <div className="mb-6">

                                    <p className="text-sm text-gray-500">
                                        Final Total Votes
                                    </p>

                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                        {
                                            finalResults.totalVotes
                                        }
                                    </p>

                                </div>


                                {/* Final Candidate Table */}

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <thead className="bg-gray-50">

                                            <tr>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Rank
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Candidate
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Votes
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody className="divide-y divide-gray-100">

                                            {finalResults.candidates?.map(
                                                (
                                                    candidate,
                                                    index
                                                ) => (

                                                    <tr
                                                        key={
                                                            candidate.candidateId ||
                                                            index
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >

                                                        <td className="px-6 py-4">

                                                            <span className="font-semibold text-gray-900">
                                                                #
                                                                {index +
                                                                    1}
                                                            </span>

                                                        </td>


                                                        <td className="px-6 py-4">

                                                            <div className="flex items-center gap-3">

                                                                {candidate.imageUrl ? (

                                                                    <img
                                                                        src={
                                                                            candidate.imageUrl
                                                                        }
                                                                        alt={
                                                                            candidate.candidateName
                                                                        }
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                    />

                                                                ) : (

                                                                    <div className="w-10 h-10 rounded-full bg-gray-100" />

                                                                )}


                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        candidate.candidateName
                                                                    }
                                                                </span>

                                                            </div>

                                                        </td>


                                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                                            {
                                                                candidate.voteCount
                                                            }
                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        ) : (

                            <div className="p-10 text-center">

                                <p className="text-gray-500">
                                    Final results are not available.
                                </p>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

