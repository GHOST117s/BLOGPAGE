import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, useParams,Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const Edit = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState(null);

async function handleEdit (e){
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('picture', picture);

    try {

      const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.post(`http://127.0.0.1:8000/api/update/${id}`, formData);
        
        navigate('/userprofile');

    } catch (err) {
        alert(err.response.data.message);
    }

}


    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">


                    <form  className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" >
                        <p className="text-center text-lg font-medium">Edit Post</p>

                        <div>
                            <label for="Title" className="sr-only">Title</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Title"
                                onChange={(e)=>{setTitle(e.target.value)}}/>


                            </div>
                        </div>

                        <div>
                            <label for="Content" className="sr-only">Content</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Content"
                                    onChange={(e)=>{setContent(e.target.value)}}  />


                            </div>
                        </div>

                        <div>
                            <label for="Picture" className="sr-only">Picture</label>

                            <div className="relative">
                                <input
                                    type="file"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Picture"
                                    onChange={(e)=>
                                        {setPicture(e.target.files[0])
        
                                        }} />


                            </div>
                        </div>



                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white" onClick={handleEdit}>
                            Submit
                        </button> 


                    </form>
                </div>
            </div>



        </div>
    )
}

export default Edit
