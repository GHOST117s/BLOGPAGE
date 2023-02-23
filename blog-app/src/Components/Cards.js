import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'




const Cards = ( {activeLink,user,posts,categories,setCategories,setPost}) => {


    
 

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
                // setCategories(response.data.categories);
                // setCategories(response.data.categories);
                setCategories(prevState => prevState.filter(category => category.id !== id));

                // window.location.reload();
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

      function handleDeletePost(id) {
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
              .put(`http://127.0.0.1:8000/api/delete/${id}`)
              .then((response) => {
                console.log(response.data);
                // setPost(response.data.post);
                setPost(prevState => prevState.filter(post => post.id !== id));

              })
              .catch((error) => {
                if (error.response && error.response.status === 401) {
                  Swal.fire({
                    title: 'Unauthorized',
                    text: 'You are not authorized to delete this Post',
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










  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
    
              {activeLink === 'categories' &&
                categories &&
                categories.map((category) => (
                  <div className="bg-white rounded-lg shadow-lg"
                 >
                    <button href="">
                      <div className="p-4 " key={category.id}>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{category.name}</h3>

                      </div>
                      <p className="m-2 text-sm text-gray-500">{`Posted by: ${category.user.name} (${category.user.email})`}</p>
                    </button>
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
                    <button href="">
                      <div className="p-4" key={post.id}>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{post.title}</h3>
                        <img src= {"http://127.0.0.1:8000/" +post.picture } alt={post.title} className="w-full h-64 object-cover" />
                        <p className="mt-2 text-sm text-gray-500">{post.content}</p>
                        <p className="mt-2 text-sm text-gray-500">{`Posted by: ${post.user.name} (${post.user.email})`}</p>
                        <div className="mt-4 flex justify-end">
                          <div className="flex justify-center">
                    <Link to={`/posts/${post.id}`}>                           
                     <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>handleview(post.id)} >
                              View
                            </button>
                            </Link>

                            {user && user.id === post.user_id && (
                        <button type="button" className="m-3 inline-block justify-center px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleDeletePost(post.id,)}>
                          Delete
                        </button>
                      )}

                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
            </div>
    </div>
  )
}

export default Cards
