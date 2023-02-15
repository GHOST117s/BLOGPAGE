import React from 'react'
import NavbarSecondary from '../Components/NavbarSecondary'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
        
        < NavbarSecondary/>
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        REGISTRATION PAGE
                    </h2>
                    <form >
                        <div className="mb-4">
                            <label for="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter Name"
                            />
                        </div>
                       
                        <div className="mb-4">
                            <label for="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                              
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter email"
                            />
                        </div>
                      
                        <div className="mb-4">
                            <label for="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password_confirmation"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="mb-4">
                        <input type="file" className=" file:border-solid block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0    file:text-sm file:font-semibold      file:bg-violet-50 file:text-violet-700        hover:file:bg-violet-100 " name='picture'/>
                         
                        </div>

<div className='flex justify-center'>
                        <button   class="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200 ...">   Sign Up  </button>
</div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link className="text-blue-500 hover:underline" to="/login">Already Have an Account?Sign In</Link>
                    
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Register
