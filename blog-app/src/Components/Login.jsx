import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import NavbarSecondary from './NavbarSecondary'
import { Link , Navigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [isAuth ,setAuth] = useState(false)

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const [formError, setFormError] = useState({});

  const validateform = () => { 
    let errors = {}

    if(formData.email.length === 0){
      errors.email = "Email is required"
    }
    if(formData.password.length === 0){
      errors.password = "Password is required"
    }

    setFormError({...errors})
    return false
  }

  const {email, password} = formData;

  const onInputChange = e => 
  setFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = async e =>{
    e.preventDefault()
    let isValid = validateform()

    try{
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      const body = JSON.stringify({email, password});

      const res = await axios.post('http://127.0.0.1:8000/api/login',body,config)
      localStorage.setItem('token', JSON.stringify( res.data.token));

      console.log(res.data);

      if(res.data.token){
        setAuth(true);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      else{
        Swal.fire({
          icon:'error',
          title:'OOps! Something went wrong ',
          showCancelButton:false,
          timer:2500
        })
      }
    }
    catch(err){
     
      Swal.fire({
        icon:'error',
        title:'Invalid details ',
        showCancelButton:false,
        timer:2500
      })
    }
  };

  if(isAuth){
    return <Navigate to='/' />
  }


  return (
    <div>
        < NavbarSecondary/>
     
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <p className="text-center text-2xl font-bold mb-6">Login Page</p>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-3">
                            <label  className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email"  placeholder="Enter email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={e => onInputChange(e)} />
                            <span>{formError && <p style={{color:"red"}}>{formError.email}</p>}</span>
                        </div>

                        <div className="mb-3">
                            <label  className="block text-gray-700 font-bold mb-2">Password</label>
                            <input type="password" name="password"  placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={e => onInputChange(e)}/>
                            <span>{formError && <p style={{color:"red"}}>{formError.password}</p>}</span>
                         
         
      
                        </div>
                        <div className='flex justify-center'>
                        <button type='submit'
  className="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200  ... "
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
