
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    getAdminElections,
    createElection,
    updateElection,
    deleteElection
} from "@/app/services/admin/electioncrud";


export default function AdminElectionsPage() {

    const router = useRouter();


  

    const [elections, setElections] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");




    const [showForm, setShowForm] = useState(false);

    const [editingElectionId, setEditingElectionId] = useState(null);

    const [formLoading, setFormLoading] = useState(false);

    const [formError, setFormError] = useState("");

    const [formSuccess, setFormSuccess] = useState("");


    const emptyForm = {
        title: "",
        positionName: "",
        description: "",
        startDate: "",
        endDate: ""
    };


    const [formData, setFormData] = useState(emptyForm);




    const [deleteId, setDeleteId] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);


 

    const loadElections = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getAdminElections();

            setElections(data);

        } catch (error) {

            console.error(
                "Failed to load elections:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load elections."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadElections();

    }, []);




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




    const openCreateForm = () => {

        setEditingElectionId(null);

        setFormData(emptyForm);

        setFormError("");

        setFormSuccess("");

        setShowForm(true);

    };




    const openEditForm = (election) => {

        setEditingElectionId(
            election.id
        );


        setFormData({
            title: election.title || "",
            positionName: election.positionName || "",
            description: election.description || "",
            startDate: election.startDate
                ? election.startDate.slice(0, 16)
                : "",
            endDate: election.endDate
                ? election.endDate.slice(0, 16)
                : ""
        });


        setFormError("");

        setFormSuccess("");

        setShowForm(true);

    };




    const closeForm = () => {

        if (formLoading) {
            return;
        }

        setShowForm(false);

        setEditingElectionId(null);

        setFormData(emptyForm);

        setFormError("");

        setFormSuccess("");

    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        setFormError("");

        setFormSuccess("");


        if (!formData.title.trim()) {

            setFormError(
                "Election title is required."
            );

            return;
        }


        if (!formData.positionName.trim()) {

            setFormError(
                "Position name is required."
            );

            return;
        }


        if (!formData.startDate) {

            setFormError(
                "Start date is required."
            );

            return;
        }


        if (!formData.endDate) {

            setFormError(
                "End date is required."
            );

            return;
        }


        if (
            new Date(formData.endDate) <=
            new Date(formData.startDate)
        ) {

            setFormError(
                "End date must be after start date."
            );

            return;
        }


        try {

            setFormLoading(true);


            const requestData = {

                title: formData.title,

                positionName:
                    formData.positionName,

                description:
                    formData.description,

                startDate:
                    formData.startDate,

                endDate:
                    formData.endDate

            };


            // EDIT

            if (editingElectionId) {

                await updateElection(
                    editingElectionId,
                    requestData
                );

                setFormSuccess(
                    "Election updated successfully."
                );

            }

            

            else {

                await createElection(
                    requestData
                );

                setFormSuccess(
                    "Election created successfully."
                );

            }


            await loadElections();


            setTimeout(() => {

                closeForm();

            }, 800);


        } catch (error) {

            console.error(
                "Election save error:",
                error
            );


            setFormError(
                error.response?.data?.message ||
                "Failed to save election."
            );


        } finally {

            setFormLoading(false);

        }

    };



    const handleDelete = async () => {

        if (!deleteId) {
            return;
        }


        try {

            setDeleteLoading(true);

            setError("");


            await deleteElection(
                deleteId
            );


            setDeleteId(null);


            await loadElections();


        } catch (error) {

            console.error(
                "Delete election error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete election."
            );


        } finally {

            setDeleteLoading(false);

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


  

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                    Loading elections...
                </p>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-6 py-8">


         

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Elections
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Create and manage your elections.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        + Create Election
                    </button>

                </div>



                {error && (

                    <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700">
                        {error}
                    </div>

                )}



                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">


            

                    <div className="px-6 py-5 border-b border-gray-100">

                        <h2 className="text-xl font-bold text-gray-900">
                            Your Elections
                        </h2>

                    </div>


                    {elections.length === 0 ? (

                        <div className="p-12 text-center">

                            <h3 className="text-lg font-semibold text-gray-900">
                                No elections found
                            </h3>

                            <p className="text-gray-500 mt-2 mb-5">
                                Create your first election to get started.
                            </p>

                            <button
                                type="button"
                                onClick={openCreateForm}
                                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Create Election
                            </button>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Election
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Position
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Start
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            End
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Status
                                        </th>

                                        <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {elections.map(
                                        (election) => (

                                            <tr
                                                key={election.id}
                                                className="hover:bg-gray-50 transition"
                                            >


                                                

                                                <td className="px-6 py-5">

                                                    <div>

                                                        <p className="font-semibold text-gray-900">
                                                            {election.title}
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            ID: {election.id}
                                                        </p>

                                                    </div>

                                                </td>


                                                

                                                <td className="px-6 py-5 text-gray-700">
                                                    {election.positionName}
                                                </td>


                                                

                                                <td className="px-6 py-5 text-gray-700 whitespace-nowrap">

                                                    {new Date(
                                                        election.startDate
                                                    ).toLocaleString()}

                                                </td>


                                        

                                                <td className="px-6 py-5 text-gray-700 whitespace-nowrap">

                                                    {new Date(
                                                        election.endDate
                                                    ).toLocaleString()}

                                                </td>


                                                

                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                                            election.status
                                                        )}`}
                                                    >
                                                        {election.status}
                                                    </span>

                                                </td>


                                        

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center justify-end gap-2">


                                                        

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/admin/elections/${election.id}`
                                                                )
                                                            }
                                                            className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        >
                                                            View
                                                        </button>


                                                        

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                election.status !==
                                                                "DRAFT"
                                                            }
                                                            onClick={() =>
                                                                openEditForm(
                                                                    election
                                                                )
                                                            }
                                                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                                        >
                                                            Edit
                                                        </button>


                                                    

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                election.status ===
                                                                "ACTIVE"
                                                            }
                                                            onClick={() =>
                                                                setDeleteId(
                                                                    election.id
                                                                )
                                                            }
                                                            className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>



            {showForm && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">


                        {/* Modal Header */}

                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">

                                    {editingElectionId
                                        ? "Edit Election"
                                        : "Create Election"
                                    }

                                </h2>

                                <p className="text-sm text-gray-500 mt-1">

                                    {editingElectionId
                                        ? "Update this draft election."
                                        : "Create a new draft election."
                                    }

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={closeForm}
                                disabled={formLoading}
                                className="text-gray-500 hover:text-gray-900 text-2xl"
                            >
                                ×
                            </button>

                        </div>


                        

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-5"
                        >


                            {formError && (

                                <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                                    {formError}
                                </div>

                            )}


                            {formSuccess && (

                                <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm">
                                    {formSuccess}
                                </div>

                            )}


                        

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Election Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. IIT Student Council Election 2026"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Position */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Position Name
                                </label>

                                <input
                                    type="text"
                                    name="positionName"
                                    value={formData.positionName}
                                    onChange={handleChange}
                                    placeholder="e.g. President"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                        

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the election..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Dates */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                    </label>

                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        End Date
                                    </label>

                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                    disabled={formLoading}
                                    className="px-5 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                                >

                                    {formLoading
                                        ? "Saving..."
                                        : editingElectionId
                                        ? "Update Election"
                                        : "Create Election"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}



            {deleteId && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">


                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Election?
                        </h2>


                        <p className="text-gray-500 mt-2">
                            This action cannot be undone. All
                            candidates, participants, and votes
                            associated with this election will be deleted.
                        </p>


                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                disabled={deleteLoading}
                                className="px-5 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="px-5 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
                            >

                                {deleteLoading
                                    ? "Deleting..."
                                    : "Delete Election"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

