"use client"

import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ForgotPasswordVerifyPage() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            await axios.post("/api/users/resetpassword", { email })
            toast.success("Sent an email to set password")
        } catch (error) {
            toast.error("Verification failed")
            console.error("Token verification error:", error);
        }
    }
    return (
        <div className="grid place-content-center min-h-screen" onSubmit={handleSubmit}>
            <form className="w-80 bg-gradient-to-r from-slate-700 to-slate-500 rounded-lg p-8 flex flex-col">
                <h1 className="mb-5 text-3xl">Forgot Password</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="p-2 rounded-md outline-none border border-blue-900 text-gray-700 bg-slate-200" placeholder="Enter your email" />

                <button
                    type="submit"
                    className="p-2 bg-slate-200 text-gray-700 rounded-md w-full mt-4 hover:bg-slate-100"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}