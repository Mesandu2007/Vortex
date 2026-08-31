
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    joinElection,
    castVote
} from "@/app/services/user/userService";


export default function JoinElectionPage() {

    const router = useRouter();


   

    const [accessCode, setAccessCode] =
        useState("");

    const [joinLoading, setJoinLoading] =
        useState(false);

    const [joinError, setJoinError] =
        useState("");

    const [showJoinErrorModal, setShowJoinErrorModal] =
        useState(false);


   

    const [election, setElection] =
        useState(null);


    

    const [selectedCandidateId, setSelectedCandidateId] =
        useState(null);

    const [voteLoading, setVoteLoading] =
        useState(false);

    const [voteError, setVoteError] =
        useState("");

    const [voteSuccess, setVoteSuccess] =
        useState("");


   

    const handleJoinElection = async (event) => {

        event.preventDefault();


        const code =
            accessCode.trim();


        if (!code) {

            setJoinError(
                "Please enter an election access code."
            );

            setShowJoinErrorModal(true);

            return;

        }


        try {

            setJoinLoading(true);

            setJoinError("");

            setVoteError("");

            setVoteSuccess("");


            const data =
                await joinElection(code);


            /*
             * The join endpoint returns the complete
             * UserElectionResponse.
             */

            setElection(data);


            setSelectedCandidateId(null);

            setAccessCode("");


        } catch (error) {

            console.error(
                "Join election error:",
                error
            );


            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem(
                    "token"
                );

                router.push(
                    "/user/login"
                );

                return;

            }


            const message =
                error.response?.data?.message ||
                "Invalid election access code.";


            setJoinError(message);

            setShowJoinErrorModal(true);

        } finally {

            setJoinLoading(false);

        }

    };


    // ==========================================
    // SELECT CANDIDATE
    // ==========================================

    const handleSelectCandidate = (
        candidateId
    ) => {

        if (
            !election ||
            election.status !== "ACTIVE" ||
            voteLoading ||
            voteSuccess
        ) {

            return;

        }


        setSelectedCandidateId(
            candidateId
        );

        setVoteError("");

    };


    // ==========================================
    // SUBMIT VOTE
    // ==========================================

    const handleSubmitVote = async () => {

        if (!election) {
            return;
        }


        if (!selectedCandidateId) {

            setVoteError(
                "Please select a candidate before submitting your vote."
            );

            return;

        }


        try {

            setVoteLoading(true);

            setVoteError("");

            setVoteSuccess("");


            const response =
                await castVote(
                    election.id,
                    selectedCandidateId
                );


            setVoteSuccess(
                response.message ||
                "Vote submitted successfully."
            );


            /*
             * Prevent another vote from being
             * submitted from this page.
             */

            setSelectedCandidateId(null);

        } catch (error) {

            console.error(
                "Vote submission error:",
                error
            );


            setVoteError(
                error.response?.data?.message ||
                "Failed to submit your vote."
            );

        } finally {

            setVoteLoading(false);

        }

    };


    // ==========================================
    // GET CANDIDATE NAME
    // ==========================================

    const getSelectedCandidateName = () => {

        if (
            !election ||
            !selectedCandidateId ||
            !election.candidates
        ) {

            return "";

        }


        const candidate =
            election.candidates.find(
                (item) =>
                    item.id ===
                    selectedCandidateId
            );


        return candidate?.name || "";

    };


    // ==========================================
    // STATUS STYLE
    // ==========================================

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


   
    const handleJoinAnotherElection = () => {

        setElection(null);

        setSelectedCandidateId(null);

        setVoteError("");

        setVoteSuccess("");

        setAccessCode("");

    };



    if (!election) {

        return (

            <div className="min-h-full bg-gray-50">

                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">


                    {/* PAGE HEADER */}

                    <div className="text-center mb-8">

                        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-600 flex items-center justify-center">

                            <span className="text-white text-2xl font-bold">
                                VS
                            </span>

                        </div>


                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Join an Election
                        </h1>


                        <p className="text-gray-500 mt-2">
                            Enter the access code provided by your election organizer.
                        </p>

                    </div>


                    {/* JOIN CARD */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">


                        <form
                            onSubmit={
                                handleJoinElection
                            }
                        >

                            <label
                                htmlFor="accessCode"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Election Access Code
                            </label>


                            <input
                                id="accessCode"
                                type="text"
                                value={accessCode}
                                onChange={(event) =>
                                    setAccessCode(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter access code"
                                autoComplete="off"
                                disabled={joinLoading}
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                            />


                            <p className="text-xs text-gray-400 mt-2">
                                Enter the code exactly as provided.
                            </p>


                            <button
                                type="submit"
                                disabled={joinLoading}
                                className="w-full mt-6 px-5 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >

                                {joinLoading
                                    ? "Validating..."
                                    : "Join Election"
                                }

                            </button>

                        </form>


                        {/* BACK */}

                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/user/dashboard"
                                    )
                                }
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                ← Back to Dashboard
                            </button>

                        </div>

                    </div>

                </div>


                {/* JOIN ERROR MODAL */}

                {showJoinErrorModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">


                            <div className="flex items-start gap-4">

                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-red-600"
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

                                </div>


                                <div className="flex-1">

                                    <h2 className="text-lg font-bold text-gray-900">
                                        Unable to Join Election
                                    </h2>


                                    <p className="text-sm text-gray-500 mt-2 leading-6">
                                        {joinError}
                                    </p>

                                </div>

                            </div>


                            <div className="flex justify-end mt-6">

                                <button
                                    type="button"
                                    onClick={() => {

                                        setShowJoinErrorModal(
                                            false
                                        );

                                        setJoinError("");

                                    }}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Try Again
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        );

    }


    // ==========================================
    // ELECTION + VOTING PAGE
    // ==========================================

    return (

        <div className="min-h-full bg-gray-50">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">


                {/* ==========================================
                    TOP ACTIONS
                ========================================== */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/user/dashboard"
                            )
                        }
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        ← Back to Dashboard
                    </button>


                    <button
                        type="button"
                        onClick={
                            handleJoinAnotherElection
                        }
                        className="text-sm px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
                    >
                        Join Another Election
                    </button>

                </div>


                {/* ==========================================
                    ELECTION INFORMATION
                ========================================== */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">


                        <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
                                    {election.title}
                                </h1>


                                <span
                                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusClass(
                                        election.status
                                    )}`}
                                >
                                    {election.status}
                                </span>

                            </div>


                            <p className="text-lg text-gray-600 mt-2">
                                {election.positionName}
                            </p>


                            {election.description && (

                                <div className="mt-5">

                                    <p className="text-sm font-semibold text-gray-700">
                                        Description
                                    </p>


                                    <p className="text-gray-600 mt-2 leading-relaxed">
                                        {election.description}
                                    </p>

                                </div>

                            )}

                        </div>


                        <div className="lg:text-right flex-shrink-0">

                            <p className="text-sm text-gray-500">
                                Election Period
                            </p>


                            <p className="text-sm font-medium text-gray-800 mt-2">
                                {new Date(
                                    election.startDate
                                ).toLocaleString()}
                            </p>


                            <p className="text-sm text-gray-500 mt-1">
                                to
                            </p>


                            <p className="text-sm font-medium text-gray-800 mt-1">
                                {new Date(
                                    election.endDate
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    VOTE ERROR
                ========================================== */}

                {voteError && (

                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">

                        <p className="text-sm text-red-700">
                            {voteError}
                        </p>

                    </div>

                )}


                {/* ==========================================
                    VOTE SUCCESS
                ========================================== */}

                {voteSuccess && (

                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-5">

                        <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">

                                <span className="text-green-700 font-bold">
                                    ✓
                                </span>

                            </div>


                            <div>

                                <h2 className="font-semibold text-green-800">
                                    Vote Submitted
                                </h2>


                                <p className="text-sm text-green-700 mt-1">
                                    {voteSuccess}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* ==========================================
                    CANDIDATES
                ========================================== */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    <div className="px-6 sm:px-8 py-5 border-b border-gray-100">

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Candidates
                        </h2>


                        <p className="text-sm text-gray-500 mt-1">

                            {election.status === "ACTIVE" &&
                            !voteSuccess
                                ? "Select one candidate to cast your vote."
                                : "Candidate information for this election."
                            }

                        </p>

                    </div>


                    {election.candidates &&
                    election.candidates.length > 0 ? (

                        <div className="divide-y divide-gray-100">

                            {election.candidates.map(
                                (candidate) => {

                                    const selected =
                                        selectedCandidateId ===
                                        candidate.id;


                                    const votingAvailable =
                                        election.status ===
                                            "ACTIVE" &&
                                        !voteSuccess &&
                                        !voteLoading;


                                    return (

                                        <div
                                            key={
                                                candidate.id
                                            }
                                            onClick={() => {

                                                if (
                                                    votingAvailable
                                                ) {

                                                    handleSelectCandidate(
                                                        candidate.id
                                                    );

                                                }

                                            }}
                                            className={`
                                                p-6
                                                sm:p-8
                                                transition

                                                ${
                                                    votingAvailable
                                                        ? "cursor-pointer hover:bg-gray-50"
                                                        : "cursor-default"
                                                }

                                                ${
                                                    selected
                                                        ? "bg-blue-50 ring-1 ring-inset ring-blue-200"
                                                        : ""
                                                }
                                            `}
                                        >

                                            <div className="flex flex-col lg:flex-row gap-6">


                                                {/* PHOTO */}

                                                <div className="flex-shrink-0">

                                                    {candidate.photo ? (

                                                        <img
                                                            src={
                                                                candidate.photo
                                                            }
                                                            alt={
                                                                candidate.name
                                                            }
                                                            className="w-28 h-28 rounded-2xl object-cover border border-gray-200"
                                                        />

                                                    ) : (

                                                        <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                                            No Photo
                                                        </div>

                                                    )}

                                                </div>


                                                {/* CANDIDATE INFORMATION */}

                                                <div className="flex-1 min-w-0">

                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">


                                                        <div>

                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                {candidate.name}
                                                            </h3>


                                                            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-gray-500">

                                                                {candidate.iitId && (

                                                                    <span>

                                                                        IIT ID:{" "}

                                                                        <span className="font-medium text-gray-700">

                                                                            {
                                                                                candidate.iitId
                                                                            }

                                                                        </span>

                                                                    </span>

                                                                )}


                                                                <span>

                                                                    Department:{" "}

                                                                    <span className="font-medium text-gray-700">

                                                                        {
                                                                            candidate.department
                                                                        }

                                                                    </span>

                                                                </span>


                                                                <span>

                                                                    Year:{" "}

                                                                    <span className="font-medium text-gray-700">

                                                                        {
                                                                            candidate.year
                                                                        }

                                                                    </span>

                                                                </span>

                                                            </div>

                                                        </div>


                                                        {/* RADIO */}

                                                        {election.status ===
                                                            "ACTIVE" &&
                                                        !voteSuccess && (

                                                            <div
                                                                className={`
                                                                    w-7
                                                                    h-7
                                                                    rounded-full
                                                                    border-2
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    flex-shrink-0

                                                                    ${
                                                                        selected
                                                                            ? "border-blue-600 bg-blue-600"
                                                                            : "border-gray-300 bg-white"
                                                                    }
                                                                `}
                                                            >

                                                                {selected && (

                                                                    <div className="w-3 h-3 rounded-full bg-white" />

                                                                )}

                                                            </div>

                                                        )}

                                                    </div>


                                                    {/* BIOGRAPHY */}

                                                    {candidate.biography && (

                                                        <div className="mt-5">

                                                            <p className="text-sm font-semibold text-gray-700">
                                                                Biography
                                                            </p>


                                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">
                                                                {
                                                                    candidate.biography
                                                                }
                                                            </p>

                                                        </div>

                                                    )}


                                                    {/* MANIFESTO */}

                                                    {candidate.manifesto && (

                                                        <div className="mt-5">

                                                            <p className="text-sm font-semibold text-gray-700">
                                                                Manifesto
                                                            </p>


                                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">
                                                                {
                                                                    candidate.manifesto
                                                                }
                                                            </p>

                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    ) : (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">
                                No candidates are available for this election.
                            </p>

                        </div>

                    )}


                    {/* ==========================================
                        VOTING SECTION
                    ========================================== */}

                    <div className="border-t border-gray-100 p-6 sm:p-8">


                        {election.status === "ACTIVE" &&
                        !voteSuccess ? (

                            <>

                                <div className="mb-5">

                                    <p className="text-sm text-gray-500">
                                        Selected Candidate
                                    </p>


                                    <p className="text-lg font-semibold text-gray-900 mt-1">

                                        {getSelectedCandidateName() ||
                                            "No candidate selected"
                                        }

                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        handleSubmitVote
                                    }
                                    disabled={
                                        !selectedCandidateId ||
                                        voteLoading
                                    }
                                    className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >

                                    {voteLoading
                                        ? "Submitting Vote..."
                                        : "Submit Vote"
                                    }

                                </button>

                            </>

                        ) : election.status === "COMPLETED" ? (

                            <div className="p-4 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium">
                                This election has been completed.
                            </div>

                        ) : election.status === "DRAFT" ? (

                            <div className="p-4 rounded-xl bg-yellow-50 text-yellow-700 text-sm font-medium">
                                Voting is not currently available.
                            </div>

                        ) : null}

                    </div>

                </div>

            </div>

        </div>

    );

}

