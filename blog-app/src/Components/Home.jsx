import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar'

const Home = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/getAllcategories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);







  return (
    <>
  <Navbar/>

  <div className="flex m-9">
      <div className="m-5 w-1/6 h-screen">
        <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <button aria-current="true" type="button" className="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600">
            All Category
          </button>
          {categories.map(category => (
            <button key={category.id} type="button" className="w-full px-4 py-2 font-medium text-left text-gray-900 border-b border-gray-200 cursor-pointer focus:outline-none dark:text-white dark:bg-gray-800 dark:border-gray-600">
              {category.name}
            </button>
          ))}
        </div>
      </div>
    
        <div className="w-3/4 p-4">
          // Main content goes here 
          {/* cards map  */}
          <div className="grid grid-cols-3 gap-4">
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 1</h3>
    <p className="text-gray-700">This is the content of card 1.</p>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 2</h3>
    <p className="text-gray-700">This is the content of card 2.</p>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 3</h3>
    <p className="text-gray-700">This is the content of card 3.</p>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 4</h3>
    <p className="text-gray-700">This is the content of card 4.</p>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 5</h3>
    <p className="text-gray-700">This is the content of card 5.</p>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold mb-2">Card 6</h3>
    <p className="text-gray-700">This is the content of card 6.</p>
  </div>
</div>
        </div>
      </div>
    
    </>
  
  )
}

export default Home
