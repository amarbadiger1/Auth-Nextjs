"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPasswordVerifyPage() {
    const [data, setData] = useState({
        password: "",
        confirmpassword: "",
    });
    const [token, setToken] = useState("");

    const VerfiyUserForgotpasswordToken = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Basic validation
        if (!data.password || !data.confirmpassword) {
            toast.error("Please fill in both fields.");
            return;
        }

        if (data.password !== data.confirmpassword) {
            toast.error("Both fields do not match.");
            return;
        }

        try {
            await axios.post("/api/users/forgotpassword", {
                token,
                password: data.password,
            });
            toast.success("Password reset successfully.");
        } catch (error: any) {
            toast.error("Verfication failed")
            console.error("Token verification error:", error);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-slate-200 text-black rounded-md m-2">
                {token ? `Token: ${token}` : "No token provided"}
            </h2>

            <form
                className="w-80 bg-gradient-to-r from-slate-700 to-slate-500 rounded-lg p-8 flex flex-col"
                onSubmit={VerfiyUserForgotpasswordToken}
            >
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                />

                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    value={data.confirmpassword}
                    onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                />

                <button
                    type="submit"
                    className="p-2 bg-slate-200 text-gray-700 rounded-md w-full mt-4 hover:bg-slate-100"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
