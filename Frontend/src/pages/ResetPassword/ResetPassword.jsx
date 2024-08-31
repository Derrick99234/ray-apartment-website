import React from 'react'
import logo from "../../assets/color_horizontal.png";
const ResetPassword = () => {
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [loading, setLoading] = React.useState()

        const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(password)
        setLoading(true)
        try{
            const response = await fetch("http://localhost:2024/api/auth/forgotten-password", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({password})
            })
            setPassword("")
            setConfirmPassword("")
            const data = await response.json()

            console.log(data)
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className='max-w-md w-full border p-4' onSubmit={handleSubmit}>
                <img src={logo} alt="royal homes logo" className="w-56 mx-auto mb-4" />
                {/* <h1 className="text-2xl font-bold mb-4 text-center font-mono">ROYAL HOME APARTMENT</h1> */}
                <h2 className="text-2xl font-semibold mb-3">Reset Password</h2>
                <label htmlFor="password1" className="block mb-2">New password</label>
                <input type="password" className="w-full py-2 border outline-none px-4" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password2" className="block mb-2 mt-4">Confirm password</label>
                <input type="password" className="w-full py-2 border outline-none px-4" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="bg-gray-800 w-full py-2 text-white mt-4">{loading ? "loading...": "Send"}</button>
            </form>
        </div>
    )
}

export default ResetPassword