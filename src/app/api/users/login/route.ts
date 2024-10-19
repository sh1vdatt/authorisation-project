import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        //check if user exist
     const user =  await User.findOne({email})  

     if(!user){
        return NextResponse.json({error: "User does not exist"}, 
            {status: 400})      
     }

     //check if password is correct
     const isPasswordCorrect = await bcryptjs.compare(password, user.password); //password in from reqBody, and the user.password is the one we are getting entered by user
     if(!isPasswordCorrect){
        return NextResponse.json({error: "Invalid Password"}, 
            {status: 400}) 
     } //create token data for JWT
     const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
     }
     // create token
     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { //here JWT sign function is used to generate token data
        expiresIn: "1d"
     })

     const response = NextResponse.json({ //it is created as JSON response using nextresponse.json
        message: "Login Successful",
        success: true,
        token
     })

     response.cookies.set("token", token, { //setting a cookie named token 
        secure: true, // specifying that cookie should be only transmitted over secure protocol
     })
     return response;
    
     
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, 
            {status: 500})
    }
}