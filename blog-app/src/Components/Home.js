import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';


import Navbar from './Navbar'

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  function handleview(id) {
   
    console.log(id);
  }
  
  useEffect(() => {
    const response = axios.get('http://127.0.0.1:8000/api/getAllcategories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (
    <>
      <Navbar />
      <h2 class="text-4xl font-extrabold dark:text-white ml-9">All Post</h2>
      <div className="flex flex-col md:flex-row md:items-stretch md:h-screen ml-9 mt-9">

        <Sidebar categories={categories} setSelectedCategory={setSelectedCategory}/>

        <div className="container mx-auto ml-10 mt-10 ">
          <div className="md:w-3/4">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories
                  .filter(category => selectedCategory === null || category.id === selectedCategory) // filter categories if a category is selected
                  .map(category => (
                    category.post.map(post => (
                      <div className="justify-center" key={post.id}>
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                          <a href="#!"></a>
                          <div className="p-6">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">{post.title}</h5>
                            <p className="text-gray-700 text-base mb-4">{post.content}</p>
                               <Link to={`/posts/${post.id}`}>                           
                     <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>handleview(post.id)} >
                              View
                            </button>
                            </Link>
                            {/* <button type="button" className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Edit</button>

                            <button  type="button" className=" ml-12 inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button> */}
                          </div>
                        </div>
                      </div>
                    ))
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  

 
}

export default Home
