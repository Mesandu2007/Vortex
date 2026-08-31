
import axios from "axios";


const API_URL = "http://localhost:8080/api";


const electionApi = axios.create({

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




export const createElection = async (electionData) => {

    const response = await electionApi.post(
        "/elections",
        electionData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};




export const getAdminElections = async () => {

    const response = await electionApi.get(
        "/elections",
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};




export const getElectionById = async (electionId) => {

    const response = await electionApi.get(
        `/elections/${electionId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};




export const updateElection = async (
    electionId,
    electionData
) => {

    const response = await electionApi.put(
        `/elections/${electionId}`,
        electionData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};




export const deleteElection = async (electionId) => {

    const response = await electionApi.delete(
        `/elections/${electionId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;

};

