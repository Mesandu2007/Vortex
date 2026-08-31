
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    getElectionById
} from "@/app/services/admin/electioncrud";

import {
    getElectionCandidates,
    startElection,
    completeElection,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from "@/app/services/admin/electionDetails";


export default function ElectionDetailsPage() {

    const { id } = useParams();

    const router = useRouter();


    const [election, setElection] = useState(null);

    const [loadingElection, setLoadingElection] =
        useState(true);

    const [electionError, setElectionError] =
        useState("");


    const [candidates, setCandidates] =
        useState([]);

    const [loadingCandidates, setLoadingCandidates] =
        useState(true);

    const [candidateError, setCandidateError] =
        useState("");


    const [statusLoading, setStatusLoading] =
        useState(false);

    const [statusError, setStatusError] =
        useState("");


    const [showCandidateForm, setShowCandidateForm] =
        useState(false);

    const [editingCandidateId, setEditingCandidateId] =
        useState(null);

    const [candidateFormLoading, setCandidateFormLoading] =
        useState(false);

    const [candidateFormError, setCandidateFormError] =
        useState("");

    const [candidateFormSuccess, setCandidateFormSuccess] =
        useState("");


    const emptyCandidateForm = {
        name: "",
        iitId: "",
        department: "",
        year: "",
        biography: "",
        manifesto: ""
    };


    const [candidateForm, setCandidateForm] =
        useState(emptyCandidateForm);


    const [candidateImage, setCandidateImage] =
        useState(null);


    const [deleteCandidateId, setDeleteCandidateId] =
        useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);


    const loadElection = async () => {

        try {

            setLoadingElection(true);
            setElectionError("");

            const data =
                await getElectionById(id);

            setElection(data);

        } catch (error) {

            console.error(
                "Failed to load election:",
                error
            );

            setElectionError(
                error.response?.data?.message ||
                "Failed to load election."
            );

        } finally {

            setLoadingElection(false);

        }

    };


    const loadCandidates = async () => {

        try {

            setLoadingCandidates(true);
            setCandidateError("");

            const data =
                await getElectionCandidates(id);

            setCandidates(data);

        } catch (error) {

            console.error(
                "Failed to load candidates:",
                error
            );

            setCandidateError(
                error.response?.data?.message ||
                "Failed to load candidates."
            );

        } finally {

            setLoadingCandidates(false);

        }

    };


    useEffect(() => {

        if (!id) {
            return;
        }

        loadElection();
        loadCandidates();

    }, [id]);


    const handleCandidateChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setCandidateForm(
            (previousData) => ({
                ...previousData,
                [name]: value
            })
        );

    };


    const handleImageChange = (e) => {

        const file =
            e.target.files?.[0] || null;

        setCandidateImage(file);

    };


    const openCreateCandidate = () => {

        setEditingCandidateId(null);

        setCandidateForm(
            emptyCandidateForm
        );

        setCandidateImage(null);

        setCandidateFormError("");
        setCandidateFormSuccess("");

        setShowCandidateForm(true);

    };


    const openEditCandidate = (candidate) => {

        setEditingCandidateId(
            candidate.id
        );

        setCandidateForm({

            name:
                candidate.name || "",

            iitId:
                candidate.iitId || "",

            department:
                candidate.department || "",

            year:
                candidate.year || "",

            biography:
                candidate.biography || "",

            manifesto:
                candidate.manifesto || ""

        });

        setCandidateImage(null);

        setCandidateFormError("");
        setCandidateFormSuccess("");

        setShowCandidateForm(true);

    };


    const closeCandidateForm = () => {

        if (candidateFormLoading) {
            return;
        }

        setShowCandidateForm(false);

        setEditingCandidateId(null);

        setCandidateForm(
            emptyCandidateForm
        );

        setCandidateImage(null);

        setCandidateFormError("");
        setCandidateFormSuccess("");

    };


    const handleCandidateSubmit = async (e) => {

        e.preventDefault();

        setCandidateFormError("");
        setCandidateFormSuccess("");


        if (!candidateForm.name.trim()) {

            setCandidateFormError(
                "Candidate name is required."
            );

            return;
        }


        if (!candidateForm.iitId.trim()) {

            setCandidateFormError(
                "IIT ID is required."
            );

            return;
        }


        if (!candidateForm.department.trim()) {

            setCandidateFormError(
                "Department is required."
            );

            return;
        }


        if (!candidateForm.year.trim()) {

            setCandidateFormError(
                "Year is required."
            );

            return;
        }


        try {

            setCandidateFormLoading(true);


            const requestData = {

                name:
                    candidateForm.name,

                iitId:
                    candidateForm.iitId,

                department:
                    candidateForm.department,

                year:
                    candidateForm.year,

                biography:
                    candidateForm.biography,

                manifesto:
                    candidateForm.manifesto

            };


            if (editingCandidateId) {

                await updateCandidate(
                    id,
                    editingCandidateId,
                    requestData,
                    candidateImage
                );

                setCandidateFormSuccess(
                    "Candidate updated successfully."
                );

            } else {

                await createCandidate(
                    id,
                    requestData,
                    candidateImage
                );

                setCandidateFormSuccess(
                    "Candidate added successfully."
                );

            }


            await loadCandidates();


            setTimeout(() => {

                closeCandidateForm();

            }, 800);


        } catch (error) {

            console.error(
                "Candidate save error:",
                error
            );

            setCandidateFormError(
                error.response?.data?.message ||
                "Failed to save candidate."
            );

        } finally {

            setCandidateFormLoading(false);

        }

    };


    const handleDeleteCandidate = async () => {

        if (!deleteCandidateId) {
            return;
        }

        try {

            setDeleteLoading(true);
            setCandidateError("");

            await deleteCandidate(
                id,
                deleteCandidateId
            );

            setDeleteCandidateId(null);

            await loadCandidates();

        } catch (error) {

            console.error(
                "Delete candidate error:",
                error
            );

            setCandidateError(
                error.response?.data?.message ||
                "Failed to delete candidate."
            );

        } finally {

            setDeleteLoading(false);

        }

    };


    const handleStartElection = async () => {

        if (!election) {
            return;
        }

        try {

            setStatusLoading(true);
            setStatusError("");

            const updatedElection =
                await startElection(
                    election.id
                );

            setElection(
                updatedElection
            );

        } catch (error) {

            console.error(
                "Start election error:",
                error
            );

            setStatusError(
                error.response?.data?.message ||
                "Failed to start election."
            );

        } finally {

            setStatusLoading(false);

        }

    };


    const handleCompleteElection = async () => {

        if (!election) {
            return;
        }

        try {

            setStatusLoading(true);
            setStatusError("");

            const updatedElection =
                await completeElection(
                    election.id
                );

            setElection(
                updatedElection
            );

        } catch (error) {

            console.error(
                "Complete election error:",
                error
            );

            setStatusError(
                error.response?.data?.message ||
                "Failed to complete election."
            );

        } finally {

            setStatusLoading(false);

        }

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


    if (loadingElection) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                    Loading election...
                </p>

            </div>

        );

    }


    if (electionError || !election) {

        return (

            <div className="min-h-screen bg-gray-50 px-6 py-10">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-5">
                        {electionError ||
                            "Election not found."}
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

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                    <div className="min-w-0">

                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/admin/elections"
                                )
                            }
                            className="text-sm text-blue-600 hover:underline mb-3"
                        >
                            ← Back to Elections
                        </button>

                        <h1 className="text-3xl font-bold text-gray-900 break-words">
                            {election.title}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {election.positionName}
                        </p>

                    </div>


                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">

                        <span
                            className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                                election.status
                            )}`}
                        >
                            {election.status}
                        </span>


                        {statusError && (

                            <div className="text-sm text-red-600">
                                {statusError}
                            </div>

                        )}


                        <div className="flex flex-wrap justify-start lg:justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        `/admin/results/${election.id}`
                                    )
                                }
                                className="px-5 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition whitespace-nowrap"
                            >
                                View Results & Stats
                            </button>


                            {election.status === "DRAFT" && (

                                <button
                                    type="button"
                                    onClick={
                                        handleStartElection
                                    }
                                    disabled={
                                        statusLoading
                                    }
                                    className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {statusLoading
                                        ? "Starting..."
                                        : "Start Election"
                                    }
                                </button>

                            )}


                            {election.status === "ACTIVE" && (

                                <button
                                    type="button"
                                    onClick={
                                        handleCompleteElection
                                    }
                                    disabled={
                                        statusLoading
                                    }
                                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {statusLoading
                                        ? "Completing..."
                                        : "Complete Election"
                                    }
                                </button>

                            )}

                        </div>

                    </div>

                </div>


                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">

                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Election Information
                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <p className="text-sm text-gray-500">
                                Position
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {election.positionName}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                Access Code
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {election.accessCode}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                Start Date
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {new Date(
                                    election.startDate
                                ).toLocaleString()}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                End Date
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {new Date(
                                    election.endDate
                                ).toLocaleString()}
                            </p>

                        </div>


                        <div className="md:col-span-2">

                            <p className="text-sm text-gray-500">
                                Description
                            </p>

                            <p className="text-gray-700 mt-2 leading-relaxed">
                                {election.description ||
                                    "No description provided."}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-100">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Candidates
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage candidates for this election.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={
                                openCreateCandidate
                            }
                            disabled={
                                election.status !==
                                "DRAFT"
                            }
                            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            + Add Candidate
                        </button>

                    </div>


                    {candidateError && (

                        <div className="mx-6 mt-5 p-4 rounded-lg bg-red-100 text-red-700">
                            {candidateError}
                        </div>

                    )}


                    {loadingCandidates ? (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">
                                Loading candidates...
                            </p>

                        </div>

                    ) : candidates.length === 0 ? (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">
                                No candidates have been added yet.
                            </p>


                            {election.status ===
                                "DRAFT" && (

                                <button
                                    type="button"
                                    onClick={
                                        openCreateCandidate
                                    }
                                    className="mt-4 px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                                >
                                    Add First Candidate
                                </button>

                            )}

                        </div>

                    ) : (

                        <div className="divide-y divide-gray-100">

                            {candidates.map(
                                (candidate) => (

                                    <div
                                        key={
                                            candidate.id
                                        }
                                        className="p-6"
                                    >

                                        <div className="flex flex-col lg:flex-row gap-6">

                                            <div className="flex-shrink-0">

                                                {candidate.imageUrl ? (

                                                    <img
                                                        src={
                                                            candidate.imageUrl
                                                        }
                                                        alt={
                                                            candidate.name
                                                        }
                                                        className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                                                    />

                                                ) : candidate.photo ? (

                                                    <img
                                                        src={
                                                            candidate.photo
                                                        }
                                                        alt={
                                                            candidate.name
                                                        }
                                                        className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                                                    />

                                                ) : (

                                                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                                        No Photo
                                                    </div>

                                                )}

                                            </div>


                                            <div className="flex-1 min-w-0">

                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {candidate.name}
                                                </h3>


                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">

                                                    <div>

                                                        <p className="text-xs text-gray-400">
                                                            IIT ID
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {candidate.iitId ||
                                                                "—"}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-gray-400">
                                                            Department
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {candidate.department ||
                                                                "—"}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-gray-400">
                                                            Year
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {candidate.year ||
                                                                "—"}
                                                        </p>

                                                    </div>

                                                </div>


                                                {candidate.biography && (

                                                    <div className="mt-4">

                                                        <p className="text-sm font-semibold text-gray-700">
                                                            Biography
                                                        </p>

                                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                            {
                                                                candidate.biography
                                                            }
                                                        </p>

                                                    </div>

                                                )}


                                                {candidate.manifesto && (

                                                    <div className="mt-4">

                                                        <p className="text-sm font-semibold text-gray-700">
                                                            Manifesto
                                                        </p>

                                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                            {
                                                                candidate.manifesto
                                                            }
                                                        </p>

                                                    </div>

                                                )}


                                                {election.status ===
                                                    "DRAFT" && (

                                                    <div className="flex flex-wrap gap-3 mt-5">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditCandidate(
                                                                    candidate
                                                                )
                                                            }
                                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setDeleteCandidateId(
                                                                    candidate.id
                                                                )
                                                            }
                                                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>


            {showCandidateForm && (

                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6">

                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">

                                    {editingCandidateId
                                        ? "Edit Candidate"
                                        : "Add Candidate"
                                    }

                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Enter the candidate information.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={
                                    closeCandidateForm
                                }
                                disabled={
                                    candidateFormLoading
                                }
                                className="text-gray-500 hover:text-gray-900 text-2xl"
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={
                                handleCandidateSubmit
                            }
                            className="p-6 space-y-5"
                        >

                            {candidateFormError && (

                                <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                                    {
                                        candidateFormError
                                    }
                                </div>

                            )}


                            {candidateFormSuccess && (

                                <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm">
                                    {
                                        candidateFormSuccess
                                    }
                                </div>

                            )}


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            candidateForm.name
                                        }
                                        onChange={
                                            handleCandidateChange
                                        }
                                        placeholder="Candidate name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        IIT ID
                                    </label>

                                    <input
                                        type="text"
                                        name="iitId"
                                        value={
                                            candidateForm.iitId
                                        }
                                        onChange={
                                            handleCandidateChange
                                        }
                                        placeholder="IIT ID"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        value={
                                            candidateForm.department
                                        }
                                        onChange={
                                            handleCandidateChange
                                        }
                                        placeholder="Department"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Year
                                    </label>

                                    <input
                                        type="text"
                                        name="year"
                                        value={
                                            candidateForm.year
                                        }
                                        onChange={
                                            handleCandidateChange
                                        }
                                        placeholder="e.g. 2nd Year"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Candidate Photo
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700"
                                />


                                {candidateImage && (

                                    <p className="text-xs text-gray-500 mt-2">
                                        {candidateImage.name}
                                    </p>

                                )}

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Biography
                                </label>

                                <textarea
                                    name="biography"
                                    value={
                                        candidateForm.biography
                                    }
                                    onChange={
                                        handleCandidateChange
                                    }
                                    placeholder="Candidate biography"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Manifesto
                                </label>

                                <textarea
                                    name="manifesto"
                                    value={
                                        candidateForm.manifesto
                                    }
                                    onChange={
                                        handleCandidateChange
                                    }
                                    placeholder="Candidate manifesto"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            <div className="flex justify-end gap-3 pt-3">

                                <button
                                    type="button"
                                    onClick={
                                        closeCandidateForm
                                    }
                                    disabled={
                                        candidateFormLoading
                                    }
                                    className="px-5 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        candidateFormLoading
                                    }
                                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                                >

                                    {candidateFormLoading
                                        ? "Saving..."
                                        : editingCandidateId
                                        ? "Update Candidate"
                                        : "Add Candidate"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {deleteCandidateId && (

                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Candidate?
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This candidate will be permanently removed from the election.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteCandidateId(null)
                                }
                                disabled={
                                    deleteLoading
                                }
                                className="px-5 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleDeleteCandidate
                                }
                                disabled={
                                    deleteLoading
                                }
                                className="px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
                            >
                                {deleteLoading
                                    ? "Deleting..."
                                    : "Delete Candidate"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

