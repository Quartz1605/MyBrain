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
import { Label } from "@/components/ui/label"
import { SelectDemo } from "./components/selectUse"

export function DialogDemo() {

  const [tags,setTags] = useState([])
  const [title,setTitle] =  useState("")
  const [description,setDescription] =  useState("")
  const [link,setLink] =  useState("")
  const [type,setType] = useState("")
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  const getTags =  async() => {

    try{

      const response = await axios.get("http://localhost:3000/api/tags/get-all-tags",{
        withCredentials : true
      })

      if(response.status === 200){

        console.log(response.data.tags)
        setTags(response.data.tags)

      }else{
        alert("Error fetching tags.")
      }
    }catch(e){
      alert("Some backend Error happened.. " + e)
    }

  }

  useEffect(() => {
    getTags();
  },[])

  
  const onSubmit = async(e) => {
    e.preventDefault();

    const body = {link,description,type,title,selectedTags}
    console.log(body)

    try{

    const response = await axios.post("http://localhost:3000/api/content/create-link",body,{withCredentials:true})

    if(response.status === 201){
      alert("Created Link !")
    }else{

      alert(response.data.message)

    }

    }catch(e){
      alert("Some error happened " + e)
    }



  }

  

  

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-purple-700 hover:bg-purple-400 border-2 border-gray-200 hover:cursor-pointer">Add a Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Link</DialogTitle>
            <DialogDescription>
              Add a Link with just a Click..
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Link</Label>
              <Input id="username-1" name="username" placeholder="something@.com" onChange={(e) => {setLink(e.target.value)}}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="Description" name="username" placeholder="something related to link" onChange={(e) => {setDescription(e.target.value)}}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Type">Type</Label>
              <SelectDemo type={type} setType={setType}/>
            </div>
            
            <div className="grid gap-2 mt-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag._id}
                    className={`px-3 py-1 rounded-full border-2 text-xs font-semibold transition-colors duration-150 ${selectedTags.includes(tag._id)
                      ? "bg-purple-200 border-purple-500 text-purple-700"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-purple-50 hover:border-purple-400"}`}
                    onClick={() => handleTagClick(tag._id)}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTags.map((id) => {
                    const tagObj = tags.find((t) => t._id === id);
                    return (
                      <span key={id} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                        {tagObj.title}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-white text-purple-500 border-2 border-gray-200 hover:bg-gray-100 hover:text-purple-500 hover:cursor-pointer" onClick={onSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
