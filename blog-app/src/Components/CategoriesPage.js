import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';

const CategoriesPage = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getcategories/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {category && (
        <div className="flex justify-center mt-10">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">User Information</h2>
              <p className="text-gray-600">Name: {category.user.name}</p>
              <p className="text-gray-600">Email: {category.user.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2 text-center">Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.post.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-100 p-4 rounded-md shadow-md"
                  >
                    <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>
              <p className="m-2 text-sm text-gray-500">{`Posted by: ${post.user.name} (${post.user.email})`}</p>
              <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out">View</button>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
