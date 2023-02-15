import React from 'react'
import NavbarSecondary from '../Components/NavbarSecondary'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div>
        < NavbarSecondary/>
     
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <p className="text-center text-2xl font-bold mb-6">Login Page</p>
                    <form>
                        <div className="mb-3">
                            <label for="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email"  placeholder="Enter email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input type="password" name="password"  placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                         
         
      
                        </div>
                        <div className='flex justify-center'>
                        <button
  class="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200  ... "
>
 
  Sign In
</button>
</div>

                    </form>
                    <div className="mt-3 text-center">
                    <Link className="text-blue-500 hover:underline" to="/register" >Don't have an Account yet?Sign Up</Link>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Login
