import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const adminApi = axios.create({

    baseURL: API_URL,
    headers: {
         "Content-Type": "application/json"

    }
});

const getAuthToken = () =>{

    if(typeof window === "undefined"){
        return null;
    }
    return localStorage.getItem("token");


};

export const getAdminDashboardData = async () =>{




    const token = getAuthToken();

    const response = await adminApi.get(

        "/elections/dashboard",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};



