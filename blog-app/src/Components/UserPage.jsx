/* eslint-disable jsx-a11y/heading-has-content */
import axios from 'axios'
import React from 'react'
import Modal from "react-modal";
// import { Link,Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useState, useEffect } from "react"
import Navbar from '../Components/Navbar'
const UserPage = () => {
  
  const [user, setUsers] = useState([ ]);
  const [posts , setPost] = useState([ ]);
  const [categories, setCategories] = useState([ ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentTitle, setCurrentTitle] = useState('');
const [currentContent, setCurrentContent] = useState('');




  const handleEditClick = (post) => {

    setCurrentTitle(post.title);
    setCurrentContent(post.content);
    setShowModal(true);
    console.log(post);

  }

  const handleCloseModal = () => {
    setShowModal(false);
  }


  function handleDeleteClick(Id) {
    // Show a confirmation dialog before deleting the comment
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this comment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://127.0.0.1:8000/api/deletecomment/${Id}`)
          .then(response => {
            console.log(response);
            // Reload the page after deleting the comment
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  function handleDeletePost(Id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this comment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://127.0.0.1:8000/api/delete/${Id}`)
          .then(response => {
            console.log(response);
            // Reload the page after deleting the comment
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }




useEffect(() => {
  const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = axios.get('http://127.0.0.1:8000/api/user')
    .then(response => {
      console.log(response.data);
      setUsers(response.data.user);
      setPost(response.data.posts) ; 
      setCategories(response.data.categories);   
  
     
 

      
      
      
      
    })
    .catch(error => {
      console.log(error);
    });
}, []);
 
  return (
    <div>     
    <Navbar/>  

     {/*user details  */}
   
   {user && (
     
    <div className="container mx-auto max-w-sm  m-9" key={user.id}>
   
    <a  className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 " >
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"  >
  </span>
  
  
  <div className="justify-between sm:flex">
    <div>
      <h3 className="text-xl font-bold text-gray-900">
      {user.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-gray-600"></p>
    </div>
    <div className="ml-3 hidden flex-shrink-0 sm:block">
      <img
        alt={user.name}
        //  src= {"http://127.0.0.1:8000/storage/" + user.pictures }  
        className="h-16 w-16 rounded-lg object-cover shadow-sm"
      />
    </div>
  </div>
  <div className="mt-4 sm:pr-8">
    <p className="text-sm text-gray-500">
      
      {user.email}
    </p>
  </div>
</a> 
 
</div>   

   
    )}
    
  
{/* side bar */}

   <div className="flex flex-col md:flex-row md:items-stretch md:h-screen m-12">


   <div className="md:w-78 text-sm font-medium text-gray-900 dark:text-white">
          <button
            aria-current="true"
            type="button"
            className="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
            
            onClick={() => setSelectedCategory(null)}>
            All Category
          </button>  
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer focus:outline-none ${selectedCategory === category.id ? 'bg-gray-200' : 'text-gray-900'} dark:text-white dark:bg-gray-800 dark:border-gray-600  hover:bg-blue-400 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
          
        </div>
          
{/* post details  */}



<div className="container mx-auto m-10">
  <div className='m-6 '>
<a
  class=" inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/download">   Create Category </a>
<a
  class=" m-6 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/download" >   Create Post </a>
</div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    {posts.map((post) => (
      <div key={post.id} className="flex justify-center">
        <div className="w-full max-w-sm rounded-lg shadow-lg bg-white">
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{post.title}</h5>
            <p className="text-gray-700 text-base mb-4">{post.content}</p>
            {/* map my comments here */}
            {post.comments.length > 0 && (
              <div className="flex flex-col space-y-1">
               {post.comments.map((comment) => (
  <div
    key={comment.id}
    className="flex justify-between items-center block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
  >
    <span className="mr-2">{comment.user.name}:</span>
    <span className="flex-grow">{comment.body}</span>
    <button
      type="button"
      className="inline-block px-2 py-1 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={() => handleDeleteClick(comment.id)}
    >
      Delete
    </button>
  </div>
))}

              </div>
            )}
            <div className="flex justify-between m-3">
              <button
                type="button"
                className="inline-block px-4 py-2 bg-blue-400 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"  onClick={() =>handleEditClick(post)}>  Edit </button>

{showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal content goes here */}
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Edit Post</h3>
                {/* Form for editing the post */}
             
             <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)} required/>

            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white m-2">Content</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"   value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)} required/>
              

              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>
                  Save
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
              <button
                type="button"
                className="ml-2 inline-block px-4 py-2 bg-red-400 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleDeletePost(post.id)} > Delete </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
</div>

   
  )
}
export default UserPage
