import React from 'react'
// import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
    
  return (
 <>
  <header aria-label="Site Header" className="bg-white">
  <div
    className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
  >
    <Link className="block text-teal-600" to="/">
     
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="64" height="64"
viewBox="0 0 64 64">
<linearGradient id="gPWjxlu7lDdzZroFFR7GZa_79041_gr1" x1="32" x2="32" y1="9.083" y2="54.676" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#gPWjxlu7lDdzZroFFR7GZa_79041_gr1)" d="M50,55H14c-2.757,0-5-2.243-5-5V14c0-2.757,2.243-5,5-5h36c2.757,0,5,2.243,5,5v36 C55,52.757,52.757,55,50,55z M14,11c-1.654,0-3,1.346-3,3v36c0,1.654,1.346,3,3,3h36c1.654,0,3-1.346,3-3V14c0-1.654-1.346-3-3-3H14 z"></path><linearGradient id="gPWjxlu7lDdzZroFFR7GZb_79041_gr2" x1="32" x2="32" y1="19" y2="45" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#gPWjxlu7lDdzZroFFR7GZb_79041_gr2)" d="M43,29h-1c-1.11,0-2-0.9-2-2c0-4.4-3.6-8-8-8h-5c-4.4,0-8,3.6-8,8v10c0,4.4,3.6,8,8,8h10 c4.4,0,8-3.6,8-8v-6C45,29.9,44.1,29,43,29z M27,25h5c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2h-5c-1.1,0-2-0.9-2-2C25,25.9,25.9,25,27,25z M37,39H27c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2C39,38.1,38.1,39,37,39z"></path>
</svg>

    </Link>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link className="text-gray-500 transition hover:text-gray-500/75 font-bold " to="/">
              Dashboard
            </Link>
          </li>

        

        </ul>
      </nav>

    

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

       { token ? null: <Link to="/login"
            className="block rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            
          >
            Login
          </Link> }

       { token ? null: <Link to="/register"
            className="block rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            
          >
            Sign Up
          </Link>}
        </div>

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
      </div>
    </div>
  </div>
</header>

 </>
  )
}

export default Navbar
