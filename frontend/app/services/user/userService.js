
import axios from "axios";


const API_URL = "http://localhost:8080/api";


const userApi = axios.create({

    baseURL: API_URL,

    headers: {
        "Content-Type": "application/json"
    }

});


// ==========================================
// GET AUTH TOKEN
// ==========================================

const getAuthToken = () => {

    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("usertoken");

};


// ==========================================
// GET AUTH HEADERS
// ==========================================

const getAuthHeaders = () => {

    const token = getAuthToken();


    return {
        Authorization: `Bearer ${token}`
    };

};


// ==========================================
// GOOGLE LOGIN
// ==========================================

export const loginUserWithGoogle = async (
    idToken
) => {

    const response =
        await userApi.post(
            "/auth/login/google",
            {
                idToken: idToken
            }
        );


    return response.data;

};


// ==========================================
// GET USER DASHBOARD
// ==========================================

export const getUserDashboard = async () => {

    const response =
        await userApi.get(
            "/user/dashboard",
            {
                headers: getAuthHeaders()
            }
        );


    return response.data;

};


// ==========================================
// JOIN ELECTION
// ==========================================

export const joinElection = async (
    accessCode
) => {

    const response =
        await userApi.post(
            `/elections/join?accessCode=${encodeURIComponent(accessCode)}`,
            {},
            {
                headers: getAuthHeaders()
            }
        );


    return response.data;

};


// ==========================================
// GET USER PROFILE
// ==========================================

export const getUserProfile = async () => {

    const response =
        await userApi.get(
            "/user/profile",
            {
                headers: getAuthHeaders()
            }
        );


    return response.data;

};


// ==========================================
// CAST VOTE
// ==========================================

export const castVote = async (
    electionId,
    candidateId
) => {

    const response =
        await userApi.post(
            `/votes/election/${electionId}`,
            {
                candidateId: candidateId
            },
            {
                headers: getAuthHeaders()
            }
        );


    return response.data;

};

