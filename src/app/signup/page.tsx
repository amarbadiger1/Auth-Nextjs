'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


export default function SignupPage() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleSignup = async (event: any) => {
        event.preventDefault();

        if (!user.username || !user.email || !user.password) {
            return toast.error("Please fill in All fields.");

        }
        try {
            const res = await axios.post("/api/users/signup", user);
            toast.success(res.data.message)
            router.push("/login");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen font-sans">
            <form className="w-80 bg-gradient-to-r from-slate-700 to-slate-500 rounded-lg p-8 flex flex-col" onSubmit={handleSignup}>
                <h1 className="mb-5 text-3xl">Sign up</h1>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
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
                    Sign up
                </button>

                <Link href="/login" className="my-3 text-center underline hover:text-orange-600 font-thin">
                    already Registered
                </Link>
            </form>
        </div>
    );
}
