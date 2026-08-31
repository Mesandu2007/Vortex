import axios from "axios";

const API_URL = "http://localhost:8080/api";

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


export const registerAdmin = async (adminData) => {

    const response = await adminApi.post(
        "/auth/register/admin",
        adminData
    );

    return response.data;

};

export const loginAdmin =  async (loginData) =>{

    const response = await adminApi.post(

        "/auth/login/admin",loginData


    );

    return response.data;


};

export const getAdminProfile =  async () =>{


    const token = getAuthToken();


    const response = await adminApi.get(
        "/admin/profile",
        {
            headers: {

                Authorization: `Bearer ${token}`
            }


        }
    );
    return response.data;
};






