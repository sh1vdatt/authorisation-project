'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function LoginPage() {
        const router = useRouter();
        const [user, setUser] = React.useState({
                email: "",
                password: "",
        })
        const[buttondisabled, setButtonDisabled] = React.useState(true);
        const [loading, setLoading] = React.useState(false);

        const onLogin = async () => {
            try{
                setLoading(true);
               const response = await axios.post("/api/users/login", user);
               console.log("Login Success", response.data);
             //  toast.success("Login Successful") keeping it for later
               router.push("/profile")
            }catch(error:any){
                console.log("Login failed", error.message);
              //  toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }

        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0){
                setButtonDisabled(false)
            }else{
                setButtonDisabled(true)
            }

        },[user]);



    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-3">
            <h1>{loading ? "Processing" : "Login" }</h1>
            <hr/>
             <label htmlFor="username">username</label>
            <input
            className="p-2 border border-solid border-black rounded-xl focus:border-black-500 text-black"    
                type="text" 
                id = "email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email" />
             <label htmlFor="email">email</label>
            <input
            className="p-2 border border-solid border-black rounded-xl focus:border-black-500 text-black"    
                type="password" 
                id = "password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" />
            <button 
            className="my-3 p-1 border border-solid border-white rounded-xl focus:border-black-500 text-white"
            onClick={onLogin}>
                Login
            </button>
            <Link href="/signup">Sign-up Here</Link>
        </div>
    );
}