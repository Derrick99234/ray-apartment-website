import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:2024/api/auth/login", {
        headers: { "content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (!data.error) {
        setLoading(false);
        navigate("/");
        localStorage.setItem("token", data.token);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
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
        <div className="flex items-center justify-center gap-3 bg-white border-2 py-2 rounded-md w-full mb-2 cursor-pointer">
          {/* <FaGoogle /> */}
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
            alt=""
            className="w-6"
          />
          <span className="font-semibold text-lg">Google</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link className="text-blue" to="/register">
              Register
            </Link>
          </p>
          <p className="cursor-pointer">Forget Password?</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
