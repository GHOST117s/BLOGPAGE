import React from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { useState } from 'react'
import Swal from 'sweetalert2'  


const UserUpdate = () => {
    const [isAuth, setAuth] = useState(false);
    const [old_password, setold_password] = useState('')
    const [new_password, setnew_password] = useState('')
    const [new_password_confirmation, setnew_password_confirmation] 
    = useState('')

  const [new_picture, setnew_picture] = useState(null);



    async function handleupdate(e) {

        e.preventDefault();

        const formData = new FormData();
        formData.append('old_password', old_password);
        
        if (new_picture) {
          formData.append('new_picture', new_picture);
        }
        if (new_password) {
          formData.append('new_password', new_password);
          formData.append('new_password_confirmation', new_password_confirmation);
        }

        try {
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const res = await axios.post('http://127.0.0.1:8000/api/updateuser', formData);


            setAuth(true);
            console.log(res.data);

            Swal.fire({
                icon: 'success',
                title: 'Update Successful!',
                showConfirmButton: false,
                timer: 1500

            })
            Navigate('/userprofile');
            
            
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }
    if (isAuth) {
        
        return <Navigate to="/userprofile" />;
      }

  return (

    <div>
        <Navbar/>

        <div className="flex justify-center">
  <div className="max-w-md w-full">
       

<form>
  <div className="mb-6 mt-12">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
    <input type="password" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your old password" required onChange={(e)=>setold_password(e.target.value)}/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your new password" required onChange={(e)=>setnew_password(e.target.value)} />
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm your new  password" required onChange={(e)=>setnew_password_confirmation(e.target.value)}/>
  </div>


<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Update Picture</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setnew_picture(e.target.files[0])}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF </p>

  
  <button type="submit" className="text-white bg-cyan-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleupdate} >Submit</button>
</form>

</div>
</div>
      
    </div>
  )
}

export default UserUpdate
