/* eslint-disable jsx-a11y/heading-has-content */
import axios from 'axios'
import React from 'react'

import { Link, Navigate } from 'react-router-dom'
// import Swal from 'sweetalert2';
import { useState, useEffect } from "react"
import Navbar from './Navbar'
import Cards from './Cards';
// import Forms from './Forms';
const UserPage = () => {

  const [user, setUsers] = useState([]);
  
  const [posts, setPost] = useState([]);
  const [categories, setCategories] = useState([]);

  const [activeLink, setActiveLink] = useState('categories');

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleShowAll = () => {
    setCategories(categories);
    setPost(posts);
    setShowCreateForm(false);
  };




 
  const openModal = () => {
    // if (activeLink === 'categories') {
    //   console.log('Create category modal opened');
    //   // handle category creation
    // } else if (activeLink === 'posts') {
    //   console.log( 'Create post modal opened');
    //   // handle post creation
    // }
    setShowCreateForm(true);
  };

  const hideModal = () => {
    setShowCreateForm(false);
  };
  // useEffect(() => {
  //   setCategories((categories) => [...categories]);  
  // }, []);

  const handleCreate = (event) => {
  
    event.preventDefault();
  if (activeLink === 'categories') {
    const categoryData = new FormData();
    categoryData.append('name', event.target.name.value);
    axios.post('http://127.0.0.1:8000/api/categories', categoryData)
      .then((response) => {
        
        console.log('Category created:', response.data);
       

        

        // setCategories(categories)
        
        setCategories((categories) => [...categories]);
        
       
        // window.location.reload(); 
      
      })
      .catch((error) => {
        console.error('Error creating category:', error);
      });
    } else if (activeLink === 'posts') {
      const postData = new FormData();
    postData.append('title', event.target.title.value);
    postData.append('content', event.target.content.value);
    postData.append('categories_id', event.target.categories_id.value);
    postData.append('picture', event.target.picture.files[0]);

    axios.post('http://127.0.0.1:8000/api/post', postData)
      .then((response) => {
        console.log('Post created:', response.data);
        setPost((posts) => [...posts]);
        
        setPost(posts)
       
        // window.location.reload();

        // Do something with the response data, like adding the new post to state
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  }

    hideModal();
  
  };

 

  // function openModal() {
  //   if (activeLink === 'categories') {
  //     // Open modal for creating category
      

  //     console.log('Create category modal opened');
  //   } else if (activeLink === 'posts') {

  //     // Open modal for creating post
  //     console.log('Create post modal opened');
  //   }
  // }
  
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
  <div className="container mx-auto max-w-sm m-9" key={user.id}>
    <button className="relative block overflow-hidden rounded-lg border border-gray-100 p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <div className="justify-between sm:flex">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="mt-1 text-xs font-medium text-gray-600"></p>
        </div>
        <div className="ml-3 hidden flex-shrink-0 sm:block relative">
          <img 
            // alt={user.name}
            src={"http://127.0.0.1:8000/" + user.picture }
            className="mr-2 w-14 h-14 rounded-full"
          />
          {/* icon for edit */}

          <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <Link to='/updateuser'>  <button className="bg-white p-2 rounded-full" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

            </button></Link>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:pr-8">
        <p className="text-sm text-gray-500">{user.email}</p>
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

<button href="#" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-700" aria-current="page" onClick={handleShowAll}>Show All</button>
            </nav>
          </div>
          <div className="w-3/4">
            <nav className="flex flex-row border-b border-gray-100 text-sm font-medium">
              <button href="#" onClick={() => setActiveLink('categories')} className={`-mb-px border-b ${activeLink === 'categories' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 flex-1`}>Categories</button>
              <button href="#" onClick={() => setActiveLink('posts')} className={`-mb-px border-b ${activeLink === 'posts' ? 'border-current text-cyan-500' : 'border-transparent text-gray-700'} p-4 hover:text-cyan-500 flex-1`}>Posts</button>
            </nav>

            {showCreateForm && (
  <form onSubmit={handleCreate}>
      {activeLink === 'categories' ? (
        
        <div>
      <div class="mb-6">
      <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a category</label>
      <input type="text" id="small-input" name='name' class="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

      <button type="submit" className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
    </div>

        
          {/* form elements for creating category */}
        </div>
      ) : activeLink === 'posts' ? (

        <div>
          <div class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text" id="title" name='title' class="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>

  <div class="mb-6">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
    <textarea id="content" name='content' class="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
  </div>

  <div class="mb-6">
    <label for="categories_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
    <select id="categories_id" name='categories_id' class="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option value={category.id}>{category.name}</option>
      ))}
    </select>
  </div>

  <div class="mb-6">
    <label for="picture" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
    <input type="file" id="picture" name='picture' class="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>

  <button type="submit" class="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>



          {/* form elements for creating post */}
        </div>
      ) : null}
  </form>
)}
      {!showCreateForm && (
        <div>
          <Cards  activeLink={activeLink} user={user} posts={posts} categories={categories} setCategories={setCategories} setPost={setPost}/>

        </div>
      )}

           

          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage
