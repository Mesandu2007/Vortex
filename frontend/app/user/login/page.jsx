
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import {
    loginUserWithGoogle
} from "@/app/services/user/userService";


export default function UserLoginPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleGoogleSuccess = async (credentialResponse) => {




        try {

            setLoading(true);
            setError("");


            const idToken =
                credentialResponse.credential;


            console.log(
                "Google ID Token:",
                idToken
            );


            if (!idToken) {

                throw new Error(
                    "Google ID token was not received."
                );

            }


            const data =
                await loginUserWithGoogle(
                    idToken
                );


            if (!data.token) {

                throw new Error(
                    "Login token was not received from the server."
                );

            }


            localStorage.setItem(
                "usertoken",
                data.token
            );


            router.push(
                "/user/dashboard"
            );


        } catch (error) {

            console.error(
                "Google login error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Google login failed. Please use your IIT account."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleGoogleError = () => {

        setError(
            "Google login was unsuccessful. Please try again."
        );

    };


    return (

        <GoogleOAuthProvider
            clientId={
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
            }
        >

            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

                <div className="w-full max-w-md">

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">


                        <div className="text-center mb-8">

                            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-600 flex items-center justify-center">

                                <span className="text-white text-2xl font-bold">
                                    VS
                                </span>

                            </div>


                            <h1 className="text-3xl font-bold text-gray-900">
                                Student Login
                            </h1>


                            <p className="text-gray-500 mt-2">
                                Sign in to participate in elections
                            </p>

                        </div>


                        <div className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-4">

                            <p className="text-sm text-blue-800 text-center leading-6">

                                Only students using an{" "}

                                <span className="font-semibold">
                                    @iit.ac.lk
                                </span>{" "}

                                Google account can sign in.

                            </p>

                        </div>


                        {error && (

                            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-4">

                                <p className="text-sm text-red-700">
                                    {error}
                                </p>

                            </div>

                        )}


                        <div className="flex justify-center">

                            {loading ? (

                                <div className="w-full py-3 rounded-lg bg-gray-100 text-gray-500 text-center font-semibold">
                                    Signing in...
                                </div>

                            ) : (

                                <GoogleLogin
                                    onSuccess={
                                        handleGoogleSuccess
                                    }
                                    onError={
                                        handleGoogleError
                                    }
                                    text="continue_with"
                                    shape="rectangular"
                                    size="large"
                                    width="360"
                                />

                            )}

                        </div>


                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">

                            <p className="text-xs text-gray-400 leading-5">
                                Only verified IIT Google accounts
                                can access the voting system.
                            </p>

                        </div>

                    </div>


                    <p className="text-center text-xs text-gray-400 mt-6">
                        Secure Student Election System
                    </p>

                </div>

            </div>

        </GoogleOAuthProvider>

    );

}


