'use client';
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { message } from "antd";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleLogin = async (event: any) => {
        event.preventDefault(); // Prevent the default form submission

        // Basic validation
        if (!user.username || !user.password) {
            message.error("Please fill in both fields.");
            return;
        }

        try {
            const res = await axios.post("/api/users/login", user); // Send user credentials
            message.success(res.data.message); // Display success message
            console.log("Login success", res.data);

            // Navigate to the home page or any other protected route
            router.push("/profile");
        } catch (error: any) {
            message.error("Error while logging in.");
            console.log("Login error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen font-sans">
            <form className="w-80 bg-gradient-to-r from-slate-700 to-slate-500 rounded-lg p-8 flex flex-col" onSubmit={handleLogin}>
                <h1 className="mb-5 text-3xl">Login</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <button
                    type="submit"
                    className="p-2 bg-slate-200 text-gray-700 rounded-md w-full mt-4 hover:bg-slate-100"
                >
                    Login
                </button>

                <Link href="/signup" className="my-3 text-center underline hover:text-orange-600 font-thin">
                    Not yet Registered
                </Link>
            </form>
        </div>
    );
}
