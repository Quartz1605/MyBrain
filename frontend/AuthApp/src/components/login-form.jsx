import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

export function LoginForm({ className, ...props }) {

  const navigate =  useNavigate();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {setUserInfo} = useAppStore();

  const loginUser = async(e) => {
    e.preventDefault();

    const body = {
      email : email,
      password : password
    }

    console.log(body)

    try{

      const response = await axios.post("http://localhost:3000/api/auth/login",body,{
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials : true
      })

      if(response.status === 200){
        alert(response.data.message)
        setUserInfo(response.data.user)
        navigate("/home")

      }else{
        alert(response.data.message)
      }

    }catch(e){

      alert("Some backend error happened " + e)

    }

  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold text-purple-700 font-bitcount">Login to your account</h1>
        <p className="text-lg text-balance text-black mr-auto">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-purple-700">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-purple-700">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="*******"
            className="text-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline text-purple-800"
          >
            Forgot your password?
          </a>
        </div>
        <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-800" onClick={loginUser}>
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
