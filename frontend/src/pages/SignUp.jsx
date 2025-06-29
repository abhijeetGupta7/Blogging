import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password length validation
    if (!formData.password || formData.password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters.");
    }

    try {
      setisLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard");
      }

      if (!data.success) {
        return setErrorMessage(data.message);
      }

    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">

      {/* Main container: splits left and right sections */}
      <div className="flex p-10 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">

        {/* Left section: Branding and intro text */}
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
          {/* Sign up form starts */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            {/* Username input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Your Username</Label>
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                required
                onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Your Email</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Your Password</Label>
              <TextInput
                id="password"
                type="password"
                placeholder="Password (min 6 chars)"
                required
                onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full self-center bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:opacity-90 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Link to sign in page */}
          <div className="mt-2 text-sm">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-600 pl-2 font-bold hover:underline">
              Sign In
            </Link>
          </div>

          {/* Show error alert if any */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
