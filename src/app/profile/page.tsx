"use client";

import { message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get("/api/users/me");
                setData(res.data.data);
            } catch (error: any) {
                toast.error("Failed to fetch user details");
            }
        };
        fetchUserDetails();
    }, []);

    // Handle logout functionality
    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successful");
            router.push("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to logout");
        }
    };

    return (
        <div className="grid place-content-center min-h-screen gap-3 ">
            <h1 className="text-2xl font-bold">Profile</h1>

            {/* Conditional rendering for user details */}

            {data ? (
                <div className="bg-purple-500 p-3 rounded-md">
                    <Link
                        className=" text-white"
                        href={`/profile/${data._id}`}
                    >
                        {data._id}
                    </Link>
                    <div className="flex gap-3">
                        <p>Username</p>
                        <p>{data.username}</p>
                    </div>
                    <div className="flex gap-3">
                        <p>Email</p>
                        <p>{data.email}</p>
                    </div>
                </div>
            ) : (
                <p>No user details available</p>
            )}

            {/* User Details Button */}
            <button
                onClick={() => console.log("User details fetched automatically.")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
            >
                Fetch User Details
            </button>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}
