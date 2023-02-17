import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import Navbar from '../Components/Navbar'


const UserPage = () => {

 
  

  


 


  return (
    <div>
     
    <Navbar/>
    

    <div className="container mx-auto max-w-sm  m-9">
    //demo card
    <a
  href="#"
  className="relative block overflow-hidden rounded-lg border border-gray-100 p-8"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="justify-between sm:flex">
    <div>
      <h3 className="text-xl font-bold text-gray-900">
        Building a SaaS product as a software developer
      </h3>

      <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
    </div>

    <div className="ml-3 hidden flex-shrink-0 sm:block">
      <img
        alt="Paul Clapton"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        className="h-16 w-16 rounded-lg object-cover shadow-sm"
      />
    </div>
  </div>

  <div className="mt-4 sm:pr-8">
    <p className="text-sm text-gray-500">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
      provident a, ipsa maiores deleniti consectetur nobis et eaque.
    </p>
  </div>


</a>

  
</div>
      

        
      
    </div>
  )
}

export default UserPage
