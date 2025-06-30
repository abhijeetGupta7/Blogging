import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Oauth() {
  const dispatch = useDispatch(); 
  const navigate=useNavigate();

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:user.displayName,
          email: user.email,
          googlePhotoUrl: user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); 
        navigate("/dashboard");
      } else {
        dispatch(signInFailure(data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Error during login", error);
      dispatch(signInFailure(error.message || "Something went wrong"));
    }
  };

  return (
    <Button type="button" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default Oauth;
