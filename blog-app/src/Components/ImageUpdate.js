import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'  
import axios from 'axios'




const ImageUpdate = () => {
    const [isAuth, setAuth] = useState(false);

    const [new_picture, setnew_picture] = useState(null);

    async function handleupdate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('new_picture', new_picture);

        try {
            const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const res = await axios.post('http://127.0.0.1:8000/api/updatepicture', formData);

            setAuth(true);
            Swal.fire({
                icon: 'success',
                title: 'Update Successful!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        catch (err) {
            alert(err.response.data.message);
        }

    }
    if (isAuth) {
        
        return <Navigate to="/userprofile" />;
      }


  return (
    <>
    <Navbar/>

    <div className="flex justify-center mt-24">
  <div className="max-w-md w-full">
       

<form>
 
 


<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Update Picture</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setnew_picture(e.target.files[0])}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF </p>

  
  <button type="submit" className="text-white bg-cyan-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleupdate} >Submit</button>
</form>

</div>
</div>
      
    

    </>
  )
}

export default ImageUpdate
