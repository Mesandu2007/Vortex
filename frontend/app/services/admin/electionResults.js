
import axios from "axios";


const API_URL = "http://localhost:8080/api";


const resultsApi = axios.create({

    baseURL: API_URL,

    headers: {
        "Content-Type": "application/json"
    }

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




export const getElectionStats = async (
    electionId
) => {

    const response = await resultsApi.get(
        `/elections/${electionId}/stats`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};




export const getElectionParticipants = async (
    electionId
) => {

    const response = await resultsApi.get(
        `/elections/${electionId}/participants`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};



export const getElectionResults = async (
    electionId
) => {

    const response = await resultsApi.get(
        `/results/election/${electionId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};

