'use client';

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleLogin = async (event: any) => {
        event.preventDefault();

        // Basic validation
        if (!user.email || !user.password) {
            toast.error("Please fill in both fields.");
            return;
        }

        try {
            const res = await axios.post("/api/users/login", user);
            toast.success(res.data.message);
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen font-sans">
            <form className="w-80 bg-gradient-to-r from-slate-700 to-slate-500 rounded-lg p-8 flex flex-col" onSubmit={handleLogin}>
                <h1 className="mb-5 text-3xl">Login</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter youe email"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
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

                <Link href="/resetpassword" className="text-center underline hover:text-blue-500 font-thin">
                    forgot password
                </Link>
            </form>
        </div>
    );
}
