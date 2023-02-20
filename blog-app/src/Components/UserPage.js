/* eslint-disable jsx-a11y/heading-has-content */
import axios from 'axios'
import React from 'react'

import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useState, useEffect } from "react"
import Navbar from './Navbar'
const UserPage = () => {
  const [user, setUsers] = useState([]);
  const [posts, setPost] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeLink, setActiveLink] = useState('categories');
  function handleview(id) {
   
    console.log(id);
  }
  function handleDeleteClick(id) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://127.0.0.1:8000/api/deletecategories/${id}`)
          .then((response) => {
            console.log(response.data);
            setCategories(response.data.categories);
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              Swal.fire({
                title: 'Unauthorized',
                text: 'You are not authorized to delete this category',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545',
              });
            } else {
              console.log(error);
            }
          });
      }
    });
  }
  useEffect(() => {
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = axios.get('http://127.0.0.1:8000/api/user')
      .then(response => {
        console.log(response.data.user);
        setUsers(response.data.user);
        setPost(response.data.posts);
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      {/*user details  */}
      {user && (
        <div className="container mx-auto max-w-sm  m-9" key={user.id}>
          <a className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 " >
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
                  src={`http://127.0.0.1:8000/storage/pictures/ ${user.picture}`}
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
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-stretch md:h-screen mx-4 ">
          <div className="md:w-1/5 text-sm font-medium text-gray-900 dark:text-white">
            <nav aria-label="Main Nav" className="flex flex-col space-y-1 m-2">
              <a href="" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Create</a>
              <a href="" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-700" aria-current="page">Show All</a>
            </nav>
          </div>
          <div className="w-3/4">
            <nav className="flex flex-row border-b border-gray-100 text-sm font-medium">
              <a href="#" onClick={() => setActiveLink('categories')} className={`-mb-px border-b ${activeLink === 'categories' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 flex-1`}>Categories</a>
              <a href="#" onClick={() => setActiveLink('posts')} className={`-mb-px border-b ${activeLink === 'posts' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 hover:text-cyan-500 flex-1`}>Posts</a>
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {activeLink === 'categories' &&
                categories &&
                categories.map((category) => (
                  <div className="bg-white rounded-lg shadow-lg">
                    <a href="">
                      <div className="p-4 " key={category.id}>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{category.name}</h3>

                      </div>
                      <p className="m-2 text-sm text-gray-500">{`Posted by: ${category.user.name} (${category.user.email})`}</p>
                    </a>
                    <div className="flex justify-center">
                      <Link to={`/category/${category.id}`}>
                        <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out">
                          View
                        </button>

                      </Link>
                      {user && user.id === category.user_id && (
                        <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleDeleteClick(category.id,)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              {activeLink === 'posts' &&
                posts &&
                posts.map((post) => (
                  <div className="bg-white rounded-lg shadow-lg">
                    <a href="">
                      <div className="p-4" key={post.id}>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{post.title}</h3>
                        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
                        <p className="mt-2 text-sm text-gray-500">{post.content}</p>
                        <p className="mt-2 text-sm text-gray-500">{`Posted by: ${post.user.name} (${post.user.email})`}</p>
                        <div className="mt-4 flex justify-end">
                          <div className="flex justify-center">
                    <Link to={`/posts/${post.id}`}>                           
                     <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>handleview(post.id)} >
                              View
                            </button>
                            </Link>

                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage
