import { SignupForm } from "@/components/signup-form"
import SignupImage from "./assets/SignupImage.png"
import { BrainCircuit } from "lucide-react"
import { useAppStore } from "./store"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - image covering whole area */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-50">
        <img
          src={SignupImage}
          alt="Signup Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Right side - signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-8 lg:px-8">
        <div className="w-full max-w-lg">
          <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 text-2xl mb-13">
            <BrainCircuit />
            MyBrain
          </div>
        </div>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
