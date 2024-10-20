'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
        const [user, setUser] = React.useState({
                email: "",
                password: "",
                username: "",

        })

        const [buttondisabled, setButtonDisabled] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const onSignUp = async () => {
        try {
            setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup Process", response.data);
          router.push("/login")
        } catch (error: any) {
            console.log("Singup Failed", error.message);
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
        }

        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0 && 
                user.username.length > 0){
                    setButtonDisabled(false)
            }else{
                setButtonDisabled(true)
            };
        }, [user]) 


    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-3">
            <h1>{loading? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input
            className="p-2 border border-solid border-black rounded-xl focus:border-black-500 text-black"    
                type="text" 
                id = "username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username" />
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
            onClick={onSignUp}>
                {buttondisabled ? "Can't Signup" : "Signup" }
            </button>
            <Link href="/login">Login Here</Link>
        </div>
    );
}