import { NextRequest,NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserModel from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"
import mongoose from "mongoose";

connect();

export const GET = async (request:NextRequest)=>{
    try {
        const userId= await getDataFromToken(request);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({message:"UserId is not Valid"},{status:400})
        } 
        const user=await UserModel.findById(userId).select("-password");
        if(!user){
            return NextResponse.json({message:"User not Found"},{status:400})
        }
        return NextResponse.json({message:"user fected",data:user})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Server Error"},{status:500})
    }
}