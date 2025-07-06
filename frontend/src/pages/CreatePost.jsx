import { Button, FileInput, Select, TextInput } from "flowbite-react"
import BlogEditor from "../components/BlogEditor"
import { useState } from "react"

export default function CreatePost() {
  
  const [content, setContent]=useState("");

  return (

    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      
      <h1 className="text-center font-semibold my-7 text-3xl">Create a post</h1>
      
      <form className="flex flex-col gap-4">

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput placeholder="Title" id="title" required className="flex-1"/>
          <Select required className="max-w-3xl">            
            <option value="uncategorizwd">Select a category</option>
            <option value="javascript">Javascript</option>            
            <option value="javascript">Javascript</option>
            <option value="javascript">Javascript</option>
          </Select>
        </div>

         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
          />
          <Button 
            type='button'
            size='sm'
            outline
          >
            Upload
          </Button>
          </div>

          <BlogEditor text={content} setText={setContent} />
        
          <Button 
            type='button'
            size='sm'
            outline
          >
            Publish Post
          </Button>
          
      </form>

    </div>
  )
}
