import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function SelectDemo({ type, setType }) {
  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Link Type</SelectLabel>
          <SelectItem value="image">image</SelectItem>
          <SelectItem value="video">video</SelectItem>
          <SelectItem value="article">article</SelectItem>
          <SelectItem value="audio">audio</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}