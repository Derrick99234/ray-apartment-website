import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import Toast from "../../components/ToastMessage/Toast";
import Oauth from "../../components/Oauth";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await fetch(
        "https://ray-apartment-website.onrender.com/api/auth/login",
        {
          headers: { "content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.error) {
        setShowToastMsg({
          isShown: true,
          type: "error",
          message: data.message,
        });
      } else {
        setTimeout(() => {
          navigate("/");
        }, 3000); // Delay for 3 seconds
        setShowToastMsg({
          isShown: true,
          type: "success",
          message: data.message,
        });
        setLoading(false);
        localStorage.setItem("token", data.token);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setShowToastMsg({
        isShown: true,
        type: "error",
        message: e.message,
      });
    }
    setLoading(false);
  };

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{
        backgroundImage: `url(
          "https://cdn.pixabay.com/photo/2016/09/18/03/28/travel-1677347_640.jpg"
        )`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top right",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white/30 backdrop-blur-sm text-center p-10 w-[500px]"
      >
        <h2 className="font-bold text-3xl mb-5">Welcome Back!</h2>
        <p>list your home today and quickly start earning more income....</p>
        <input
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          className="w-full py-3 px-4 rounded-lg mb-5 mt-3 border outline-none"
          onChange={(e) => handleChange(e)}
        />
        <div className="relative w-full">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            className="w-full py-3 px-4 rounded-lg mb-5 border outline-none"
            onChange={(e) => handleChange(e)}
          />
          {isPasswordVisible ? (
            <CiUnlock
              className="text-blue text-lg absolute right-3 top-4 cursor-pointer"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            />
          ) : (
            <CiLock
              className="text-blue text-lg absolute right-3 top-4 cursor-pointer"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            />
          )}
        </div>
        <button className="bg-blue w-full py-2 text-white text-xl mb-3">
          {loading ? "loading..." : "Log In"}
        </button>
        <div className="flex justify-center items-center gap-2 my-2">
          <hr className="bg-slate-400" />
          <span>or</span>
          <hr className="bg-slate-400" />
        </div>
        <Oauth/>
        <div className="flex justify-between items-center mt-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link className="text-blue" to="/register">
              Register
            </Link>
          </p>
          <Link className="" to={"/forgotten-password"}>Forget Password?</Link>
        </div>
      </form>
      <Toast setShowToastMsg={setShowToastMsg} showToastMsg={showToastMsg} />
    </div>
  );
}

export default Login;
