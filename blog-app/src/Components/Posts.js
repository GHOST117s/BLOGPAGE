import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Posts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getPosts/${id}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

 






  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="bg-gray-200 px-4 py-2 ">{post.title}</div>
          <div className="px-4 py-2">
            <p className="text-gray-700">{post.content}</p>
            <img src={post.picture} alt={post.title} className="my-4 mx-auto max-h-96 object-contain" />
            <div className="text-gray-700">
              <strong>User:</strong> {post.user.name} ({post.user.email})
            </div>
            <div className="text-gray-700">
              <strong>Categories:</strong> {post.categories.name}
            </div>
            <div className="text-gray-700">
              <strong>Comments:</strong>
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mt-4">
                  <div className="font-bold">{comment.user.name}</div>
                  <div className="text-gray-700">{comment.content}</div>
                  <div className="text-gray-700">
                    <strong>User:</strong> {comment.user.name} ({comment.user.email})
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
