import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"

function Oauth() {
    const navigate = useNavigate();
const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data)
      navigate("/");
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
   <div className="flex items-center justify-center gap-3 bg-white border-2 py-2 rounded-md w-full mb-2 cursor-pointer" onClick={handleGoogleClick}>
          {/* <FaGoogle /> */}
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
            alt=""
            className="w-6"
          />
          <span className="font-semibold text-lg">Google</span>
    </div>
  )
}

export default Oauth