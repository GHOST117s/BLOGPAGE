import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

import NavbarSecondary from './NavbarSecondary'
import { Link,Navigate } from 'react-router-dom'
import { useState} from 'react'
// import UserPage from './UserPage';

const Register = () => {
    const [isAuth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const fromData = new FormData();
    fromData.append('name', name);
    fromData.append('email', email);
    fromData.append('password', password);
    fromData.append('password_confirmation', password_confirmation);
    fromData.append('picture', picture);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', fromData);
      
      // extract the token from the response object
      const token = res.data.token;

      // save the token in localStorage
      localStorage.setItem('token', token);

      // set isAuth to true and navigate to the userprofile page
      setAuth(true);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  if (isAuth) {
    Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        showConfirmButton: false,
        timer: 1500
      });
    return <Navigate to="/userprofile" />;
  }

   
   
    



  return (
    <div>
        
        < NavbarSecondary/>
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        REGISTRATION PAGE
                    </h2>
                    <form encType="multipart/form-data" >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2" req>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter Name" onChange={(e)=>
                                {setName(e.target.value)

                                }}
                            />
                        </div>
                       
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                              
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter email" 
                                onChange={(e)=>
                                    {setEmail(e.target.value)
    
                                    }} />
                            
                        </div>
                      
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                               
                                name="password"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                onChange={(e)=>
                                    {setPassword(e.target.value)
    
                                    }} />
                         
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                               
                                name="password_confirmation"
                                
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                onChange={(e)=>
                                    {setConfirmPassword(e.target.value)
    
                                    }} />
                         
                        </div>
                        <div className="mb-4">

                        <input type="file" className=" file:border-solid block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0    file:text-sm file:font-semibold      file:bg-violet-50 file:text-violet-700        hover:file:bg-violet-100 " name='picture'  onChange={(e)=>
                                {setPicture(e.target.files[0])

                                }} />
                         
                            </div>
                            {/* <span>{formError && <p style={{color:"red"}}>{formError.email}</p>}</span> */}

                            <div className='flex justify-center'>

                        <button  type='submit'  className="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200 ..." onClick={handleSubmit} >   Sign Up  </button>
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
