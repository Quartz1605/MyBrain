import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";


export function DialogProfileLink() {

  const [link,setLink] = useState()

  const getProfileLink = async() => {

    try{

      const response = await axios.get("http://localhost:3000/api/link/get-link",{withCredentials : true})

      if(response.status === 200 || response.status === 201){
        
        setLink(response.data.link)
      }else{
        alert(response.data.message)
      }

    }catch(e){

      alert("Some backend error happened " + e)

    }


  }

  useEffect(() => {

    getProfileLink();

  },[])
  
  

  
  
  

  
  
  

  

  
  const handleCopy = async (e) => {
    e.preventDefault();
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        toast("Profile link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link");
      }
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-700 border-2 border-gray-200 hover:cursor-pointer">Share Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Link</DialogTitle>
            <DialogDescription>
              Get a shareable link of your account..
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="name" placeholder="profile-link" value={link} readOnly />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleCopy} className="bg-white text-purple-500 border-2 border-gray-200 hover:bg-gray-100 hover:text-purple-500 hover:cursor-pointer" >Copy To Clipboard</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}