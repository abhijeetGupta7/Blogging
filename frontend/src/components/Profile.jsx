import { Spinner, Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);
  const [changePassword, setChangePassword] = useState(false); // Toggle for password input

  const fileInputRef = useRef();
  const dispatch = useDispatch();

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Preview
    }
  };

  // Handle input changes for username/email/password
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  // Add image to formData when selected
  useEffect(() => {
    if (imageFile) {
      setFormData((prev) => ({
        ...prev,
        profileImage: imageFile,
      }));
    }
  }, [imageFile]);

  // Submit handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const noChanges =
      (!formData.username || formData.username === currentUser.username) &&
      (!formData.email || formData.email === currentUser.email) &&
      (!changePassword || !formData.password) &&
      !formData.profileImage;

    if (noChanges) {
      dispatch(updateProfileFailure("No changes made"));
      return;
    }

    if (changePassword && formData.password && formData.password.length < 6) {
      dispatch(updateProfileFailure("Password must be at least 6 characters"));
      return;
    }

    dispatch(updateProfileStart());

    try {
      const form = new FormData();

      if (formData.username) form.append("username", formData.username);
      if (formData.email) form.append("email", formData.email);
      if (changePassword && formData.password)
        form.append("password", formData.password);
      if (formData.profileImage) form.append("file", formData.profileImage);

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: form,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateProfileFailure(data.message || "Update failed"));
      } else {
        setSuccess("Profile updated successfully");
        dispatch(updateProfileSuccess(data.user));
      }
    } catch (err) {
      dispatch(updateProfileFailure("Something went wrong"));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {/* Title */}
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      {/* Profile Form */}
      <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          hidden
        />

        {/* Profile picture preview */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        {/* Username */}
        <TextInput
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        {/* Email */}
        <TextInput
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        {/* Change password toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="changePassword"
            checked={changePassword}
            onChange={() => setChangePassword((prev) => !prev)}
          />
          <label htmlFor="changePassword" className="text-sm">
            Change Password
          </label>
        </div>

        {/* Conditionally show password input */}
        {changePassword && (
          <TextInput
            type="password"
            placeholder="New Password (min 6 characters)"
            id="password"
            onChange={handleChange}
            required
          />
        )}

        {/* Submit Button */}
        <Button type="submit" outline disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" /> Updating...
            </div>
          ) : (
            "Update"
          )}
        </Button>

        {/* Alerts */}
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
      </form>

      {/* Account actions */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer border-2 p-1 rounded-xl hover:font-semibold">
          Delete Account
        </span>
        <span className="cursor-pointer border-2 p-1 rounded-xl hover:font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
}
