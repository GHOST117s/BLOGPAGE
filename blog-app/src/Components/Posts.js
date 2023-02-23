import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams,Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const Posts = () => {


  const token = localStorage.getItem('token');
  const { id } = useParams();

  const [post, setPost] = useState('');
  const [body, setbody] = useState('');
  const [user, setUsers] = useState([]);
  // const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getPosts/${id}`)
      .then((response) => {
        console.log(response.data.post);
        console.log(response.data);
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);





// user details

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const formattedToken = token.replace(/^"(.*)"$/, '$1');
    axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
    axios.get('http://127.0.0.1:8000/api/user')
      .then(response => {
        console.log(response.data);
        setUsers(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }
}, []);








async function handleCommentSubmit(e) {
  e.preventDefault();
  console.log(body);
  console.log('clicked');

  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You need to be logged in to comment.');
    return;
  }

  const formData = new FormData();
  formData.append('body', body);
  formData.append('post_id', id);

  try {
    const formattedToken = token.replace(/^"(.*)"$/, '$1');    
    axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;

    const res = await axios.post(`http://127.0.0.1:8000/api/store-comment`, formData);
    console.log(res.data.comment);

    const response = await axios.get(`http://127.0.0.1:8000/api/getPosts/${id}`);
    console.log(response.data.post);

    // Update the state of the post with the new comment data
    setPost(response.data.post);

    // Clear the comment form
    setbody((body) => [...body, res.data.comment]);
    setbody('');

  } catch (err) {
    alert(err.response.data.message);
  }
}






  if (!post) {
    return <div>Loading...</div>;
  }

  async function handleDeleteClick(id) {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          await axios.put(`http://127.0.0.1:8000/api/deletecomment/${id}`);
  
          // Remove the deleted comment from the post.comments array
          const updatedComments = post.comments.filter(comment => comment.id !== id);
          setPost(prevPost => ({ ...prevPost, comments: updatedComments }));
  
          // Show a success message
        
        } catch (error) {
          console.log(error);
          // Show an error message
          Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#dc3545',
          });
        }
      }
    });
  }
  


  // function handelEdit(id) {
  //   const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');    
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   axios.get(`http://127.0.0.1:8000/api/edit/${id}`)
  //     .then(response => {
  //       console.log(response);

  //     })

  // }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-4 ">
        <div className="bg-white rounded-lg overflow-hidden shadow-md ">
          <div className="bg-gray-200 px-4 py-2 "></div>
          <div className="px-4 py-2">
            <p className="text-gray-700"></p>
            <article class="flex bg-white transition hover:shadow-xl">
  <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
    <time
      datetime="2022-10-10"
      class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
    >
      <span></span>
      <span class="w-px flex-1 bg-gray-900/10"></span>
      <span></span>
    </time>
  </div>

  <div class="hidden sm:block sm:basis-56">
    <img
      alt="Guitar"
      src={"http://127.0.0.1:8000/" + post.picture}
      class="aspect-square h-full w-full object-cover"
    />
  </div>

  <div class="flex flex-1 flex-col justify-between">
    <div class="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
      <a href="#">
        
        <h3 class="font-bold uppercase text-gray-900">Title : 
        {post.title}
        </h3>
      </a>

      <p class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">Content : 
      {post.content}
      </p>
    </div>
 {/* edit button */}
    <div class="sm:flex sm:items-end sm:justify-end">
    {user.id === post.user_id && token && (
  <Link to={`/editpost/${post.id}`}>
    <button type="button" className=" mr-2 block bg-cyan-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
      Edit
    </button>
  </Link>
)}

    </div>
    <p class="mt-2 ml-6 text-sm leading-relaxed text-gray-700 line-clamp-3">Author --&gt; 
      {post.user.name}
      </p>
    
  </div>
</article>
       
           

       




            <div className="text-gray-700">

              <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
                  </div>
                  <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label for="comment" className="sr-only">Your comment</label>
                      <textarea  id="comment" rows="6"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."    onChange={(e) => setbody(e.target.value)}></textarea>
                    </div>
                    <button
                      type="submit"
                      className="inline-block px-2 py-1 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-2" onClick={handleCommentSubmit} >Post Comment</button>
                  </form>
                </div>
              </section>


              {/* comments */}





              {/*  */}







              {/* <strong>Comments:</strong> */}
              {post.comments.map((comment) => (
     <div key={comment.id} >

<article className="p-6 mb-6 text-base bg-white-50 rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        className="mr-2 w-12 h-12 rounded-full"
                         src={"http://127.0.0.1:8000/" + comment.user.picture}
                        alt={comment.user.name}/>{comment.user.name}</p>
             {/*   <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>*/}
            </div>
            
           
           

            </footer>
            <div className="flex items-center">
              <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
              </div>
           
{ user && (user.id === comment.user_id || user.id === post.user_id) &&  (
              <><button
                        type="button"
                        className="inline-block px-2 py-1 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-2"
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        Delete
                      </button>
                      
                      <button   className=" ml-1 inline-block px-2 py-1 bg-yellow-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mt-2">Edit</button></>





            )}          
            </article>
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
