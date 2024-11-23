"use client";

import { message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [data, setData] = useState<any>(null); // Explicit type for clarity
    const router = useRouter();

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get("/api/users/me");
                setData(res.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                message.error("Failed to fetch user details");
            }
        };
        fetchUserDetails();
    }, []);

    // Handle logout functionality
    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await axios.get("/api/users/logout");
            message.success("Logout Successful");
            router.push("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            message.error("Failed to logout");
        }
    };

    return (
        <div className="grid place-content-center min-h-screen gap-3">
            <h1 className="text-2xl font-bold">Profile</h1>

            {/* Conditional rendering for user details */}
            {data ? (
                <Link
                    className="bg-purple-500 text-white p-2 rounded-md"
                    href={`/profile/${data._id}`}
                >
                    {data._id}
                </Link>
            ) : (
                <p>No user details available</p>
            )}

            <hr />

            {/* User Details Button */}
            <button
                onClick={() => console.log("User details fetched automatically.")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
            >
                Fetch User Details
            </button>

            <p>Profile page content here</p>

            <hr />

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
