import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const parsedData = loginUserSchema.safeParse(body);

    // Validate the data
    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation Failed", errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    // Compare the input password with the stored hashed password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
