import React from 'react'
import logo from "../../assets/color_horizontal.png";
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../components/ToastMessage/Toast';
const ResetPassword = () => {
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [loading, setLoading] = React.useState()
    const navigate = useNavigate()

    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const [showToastMsg, setShowToastMsg] = React.useState({
        isShown: false,
        type: "add",
        message: "",
    });


  const token = query.get('token');
//   const email = query.get('email');

  const [error, setError] = React.useState({
    showError: false,
    message: ""
  })

  React.useEffect(() => {
    setTimeout(() => {
        setError({
            showError: false,
            message: ""
        })
    }, 5000)
  }, [error.showError])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            if(!password || !confirmPassword){
               setShowToastMsg({
                    isShown: true,
                    type: "error",
                    message: "Please fill out all fields",
                });
                return
            }

            if(confirmPassword !== password) {
                setShowToastMsg({
                    isShown: true,
                    type: "error",
                    message: "Password does not match",
                });
                return
            }
            const response = await fetch("http://localhost:2024/api/auth/reset-password", {
                method: "POST",
                headers: {"content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify({password})
            })
            setPassword("")
            setConfirmPassword("")
            const data = await response.json()
            
            if(data.error && data.err.name == "TokenExpiredError"){
                setTimeout(() => {
                    navigate("/forgotten-password");
                }, 3000); 
                 setShowToastMsg({
                    isShown: true,
                    type: "error",
                    message: "password reset link expired",
                });
                return
            } else {
                setTimeout(() => {
                    navigate("/login");
                }, 3000); 
                setShowToastMsg({
                    isShown: true,
                    type: "success",
                    message: data.message,
                });
            }

        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen flex-col">
            <form className='max-w-md w-full border p-4' onSubmit={handleSubmit}>
                <img src={logo} alt="royal homes logo" className="w-56 mx-auto mb-4" />
                {/* <h1 className="text-2xl font-bold mb-4 text-center font-mono">ROYAL HOME APARTMENT</h1> */}
                {/* <span className="text-sm text-gray-500">{email}</span> */}
                <h2 className="text-2xl font-semibold mb-3">Password Reset</h2>
                <label htmlFor="password1" className="block mb-2">New password</label>
                <input type="password" className="w-full py-2 border outline-none px-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password2" className="block mb-2 mt-4">Confirm password</label>
                <input type="password" className="w-full py-2 border outline-none px-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="bg-gray-800 w-full py-2 text-white mt-4" disabled={loading}>{loading ? "loading...": "Send"}</button>
            </form>
            <p className="text-center text-red-400">{error.showError && error.message}</p>
            <Toast setShowToastMsg={setShowToastMsg} showToastMsg={showToastMsg} />
        </div>
    )
}

export default ResetPassword