
import axios from "axios";


const API_URL = "http://localhost:8080/api";


const electionDetailsApi = axios.create({

    baseURL: API_URL

});


const getAuthToken = () => {

    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("token");

};


const getAuthHeaders = () => {

    const token = getAuthToken();

    return {
        Authorization: `Bearer ${token}`
    };

};



export const startElection = async (electionId) => {

    const response = await electionDetailsApi.post(
        `/elections/${electionId}/start`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};



export const completeElection = async (electionId) => {

    const response = await electionDetailsApi.post(
        `/elections/${electionId}/complete`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};


export const getElectionCandidates = async (electionId) => {

    const response = await electionDetailsApi.get(
        `/candidates/election/${electionId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


export const getCandidateById = async (
    electionId,
    candidateId
) => {

    const response = await electionDetailsApi.get(
        `/candidates/election/${electionId}/candidate/${candidateId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};






export const createCandidate = async (
    electionId,
    candidateData,
    image
) => {

    const formData = new FormData();


    formData.append(
        "candidate",
        new Blob(
            [
                JSON.stringify(candidateData)
            ],
            {
                type: "application/json"
            }
        )
    );


    if (image) {

        formData.append(
            "image",
            image
        );

    }


    const response = await electionDetailsApi.post(
        `/candidates/election/${electionId}`,
        formData,
        {
            headers: {
                ...getAuthHeaders()
            }
        }
    );


    return response.data;

};




export const updateCandidate = async (
    electionId,
    candidateId,
    candidateData,
    image
) => {

    const formData = new FormData();


    formData.append(
        "candidate",
        new Blob(
            [
                JSON.stringify(candidateData)
            ],
            {
                type: "application/json"
            }
        )
    );


    if (image) {

        formData.append(
            "image",
            image
        );

    }


    const response = await electionDetailsApi.put(
        `/candidates/election/${electionId}/candidate/${candidateId}`,
        formData,
        {
            headers: {
                ...getAuthHeaders()
            }
        }
    );


    return response.data;

};




export const deleteCandidate = async (
    electionId,
    candidateId
) => {

    const response = await electionDetailsApi.delete(
        `/candidates/election/${electionId}/candidate/${candidateId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};

