import { connect } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Establish DB connection
connect();

// Define schema validation
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation Failed", errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { username, email, password } = parsedData.data;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save the new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "User created successfully", user: savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
