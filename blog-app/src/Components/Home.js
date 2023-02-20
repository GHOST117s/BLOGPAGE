import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import Navbar from './Navbar'

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
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
        <div className="md:w-78 text-sm font-medium text-gray-900 dark:text-white">
        
          <button
            aria-current="true"
            type="button"
            className="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
            onClick={() => setSelectedCategory(null)}
          >
            All Category
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer focus:outline-none ${selectedCategory === category.id ? 'bg-gray-200' : 'text-gray-900'} dark:text-white dark:bg-gray-800 dark:border-gray-600  hover:bg-blue-400 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
              onClick={() => setSelectedCategory(category.id)} >
              {category.name}
            
            </button>
            
          ))}
        </div>
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
                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View</button>
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
