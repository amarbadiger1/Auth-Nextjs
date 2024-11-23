import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        // Setting the cookie to expire
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response; // Ensure to return the response
    } catch (error: any) {
        console.error("Logout Error:", error.message);
        return NextResponse.json(
            { message: "Error while logging out", success: false },
            { status: 500 }
        );
    }
}
