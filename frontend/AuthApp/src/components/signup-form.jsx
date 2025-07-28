import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppStore } from "@/store";


export function SignupForm({ className, ...props }) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [firstName,setfirstName] = useState("")
  const [lastName,setlastName] = useState("")
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();

  const [showPassword, setShowPassword] = useState(false);

  const signupUser = async(e) => {

    e.preventDefault()

    const body = {
      email : email,
      password : password,
      firstName : firstName,
      lastName : lastName
    }

    console.log(body)

    try{

      const response = await axios.post("http://localhost:3000/api/auth/signup",body,{
        headers : {
          "Content-Type" : "application/json"
        },
        withCredentials : true
      })

      if(response.status === 201){

        alert(response.data.message)
        navigate("/home")
        setUserInfo(response.data.user)
        
      }else{
        alert(response.data.message)
      }

      

    }catch(e){

      alert("Some backend error happened +" + e )

    }



  }
  

  return (
    <div className="w-full max-w-md mx-auto" style={{ fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif" }}>
      <form className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1
            className="text-3xl font-bold text-purple-700"
            style={{
              fontSize: '32px',
              fontWeight: '700',
              fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
            }}
          >
            Sign up
          </h1>
          <p
            className="text-base text-black"
            style={{
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
            }}
          >
            Sign up for free to access to in any of our products
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="email"
              className="text-purple-700"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              className="h-14 rounded-xl border border-gray-300/35 bg-transparent px-4"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(102, 102, 102, 0.35)',
                height: '48px',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
              required
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between w-full">
              <Label
                htmlFor="password"
                className="text-purple-700"
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
                }}
              >
                Password
              </Label>
              <button
                type="button"
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
                onClick={() => setShowPassword(!showPassword)}
                 
              >
                {showPassword ? (
                  <Eye className="w-6 h-6 text-purple-600" />
                ) : (
                  <EyeOff className="w-6 h-6 text-purple-600" />
                )}
                <span
                  className="text-purple-600"
                  style={{
                    fontSize: '18px',
                    fontWeight: '400',
                    fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
                  }}
                >
                  {showPassword ? "Show" : "Hide"}
                </span>
              </button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-14 rounded-xl border border-gray-300/35 bg-transparent px-4"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(102, 102, 102, 0.35)',
                height: '48px',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className="text-sm mt-1 text-gray-600"
              style={{
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif",
                margin: '0'
              }}
            >
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>


            <div className="flex flex-col gap-1">
            <Label
              htmlFor="firstName"
              className="text-purple-700 mt-6"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              className="h-14 rounded-xl border border-gray-300/35 bg-transparent px-4 mt-2"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(102, 102, 102, 0.35)',
                height: '48px',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
              required
              onChange={(e) => setfirstName(e.target.value)} 
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label
              htmlFor="lastName"
              className="text-purple-700 mt-6"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                
              }}
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              className="h-14 rounded-xl border border-gray-300/35 bg-transparent px-4 mt-2"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(102, 102, 102, 0.35)',
                height: '48px',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
              required
              onChange={(e) => setlastName(e.target.value)} 
            />
          </div>

            
          </div>
        </div>

        

        {/* Submit Button and Login Link */}
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="px-20 py-4 text-white font-medium rounded-full bg-purple-500 hover:bg-purple-800"
            style={{
              borderRadius: '32px',
              height: '64px',
              width: '250px',
              fontSize: '22px',
              fontWeight: '500',
              fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
            }}
            onClick={signupUser}
          >
            Sign up
          </Button>
          <div className="flex items-center gap-1 p-0.5">
            <span
              className="text-black"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
            >
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="underline text-purple-800 hover:text-purple-600"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: "'Poppins', -apple-system, Roboto, Helvetica, sans-serif"
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
