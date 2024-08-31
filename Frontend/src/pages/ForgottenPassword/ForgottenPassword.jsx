import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'

function ForgottenPassword() {
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email)
        setLoading(true)
        try{
            const response = await fetch("http://localhost:2024/api/auth/forgotten-password", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({email})
            })
            setEmail("")
            const data = await response.json()

            console.log(data)
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
  return (
    <>
    <div className="flex items-center justify-end p-4 bg-black">
        <Link to="/login">
          <HiArrowLeft className="text-2xl cursor-pointer text-white" />
        </Link>
    </div>
    <div className="min-h-screen flex items-center justify-center">
        <form className='max-w-md w-full border p-4' onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-3">Forgot Password</h2>
            <label htmlFor="email" className="block mb-2">Please provide your email address</label>
            <input type="email" placeholder='example@gmail.com' className="w-full py-2 border outline-none px-4" onChange={(e) => setEmail(e.target.value)} />
            <button className="bg-gray-800 w-full py-2 text-white mt-4">{loading ? "loading...": "Send"}</button>
        </form>
    </div>
    </>
  )
}

export default ForgottenPassword