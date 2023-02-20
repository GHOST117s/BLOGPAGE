/* eslint-disable jsx-a11y/heading-has-content */
import axios from 'axios'
import React from 'react'

// import { Link, Navigate } from 'react-router-dom'
// import Swal from 'sweetalert2';
import { useState, useEffect } from "react"
import Navbar from './Navbar'
import Cards from './Cards';
const UserPage = () => {
  const [user, setUsers] = useState([]);
  const [posts, setPost] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeLink, setActiveLink] = useState('categories');

 

  function openModal() {
    if (activeLink === 'categories') {
      // Open modal for creating category
      

      console.log('Create category modal opened');
    } else if (activeLink === 'posts') {

      // Open modal for creating post
      console.log('Create post modal opened');
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     axios.get('http://127.0.0.1:8000/api/user')
      .then(response => {
        console.log(response.data);
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
          <button className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 " >
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
                  src={`http://127.0.0.1:8000/storage/public/pictures/${user.picture}`}

                  className="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4 sm:pr-8">
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </button>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-stretch md:h-screen mx-4 ">
          <div className="md:w-1/5 text-sm font-medium text-gray-900 dark:text-white">
            <nav aria-label="Main Nav" className="flex flex-col space-y-1 m-2">
              <button href="" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" onClick={()=>
              openModal()}>Create</button>
              <button href="" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-700" aria-current="page">Show All</button>
            </nav>
          </div>
          <div className="w-3/4">
            <nav className="flex flex-row border-b border-gray-100 text-sm font-medium">
              <button href="#" onClick={() => setActiveLink('categories')} className={`-mb-px border-b ${activeLink === 'categories' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 flex-1`}>Categories</button>
              <button href="#" onClick={() => setActiveLink('posts')} className={`-mb-px border-b ${activeLink === 'posts' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 hover:text-cyan-500 flex-1`}>Posts</button>
            </nav>

            <Cards  activeLink={activeLink} user={user} posts={posts} categories={categories} setCategories={setCategories} />

          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage
