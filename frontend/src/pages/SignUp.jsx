import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";


export default function SignUp() {
  
  return (
    <div className="min-h-screen mt-20">

      <div className="flex p-10 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
        {/* Left section: Branding and brief description */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
              Abhijeet's
            </span>
            <span className="text-black">Blog</span>
          </Link>

          <p className="mt-3 text-base italic text-black">
            Share your thoughts, ideas, and projects with the world. Join a growing
            community of passionate writers and developers.
          </p>
        </div>

        {/* Right section: Sign Up Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Your Username</Label>
              <TextInput id="username" type="text" placeholder="Username" required />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Your Email</Label>
              <TextInput id="email" type="email" placeholder="Email" required />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Your Password</Label>
              <TextInput id="password" type="password" placeholder="Password" required />
            </div>

            <Button
              type="submit"
              className="w-full self-center bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Sign Up
            </Button>
          </form>

          {/* Link to sign-in page */}
          <div className="mt-2 text-sm">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-600 pl-2 font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
