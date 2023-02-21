import React from 'react'

const Sidebar = ({ categories, setSelectedCategory }) => {
  return (
    <div className="w-78 text-sm font-medium text-gray-900 dark:text-white">
    <button
      aria-current="true"
      className="w-full p-2 font-medium text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
      onClick={() => setSelectedCategory(null)}
    >
      All
    </button>
    {categories.map(category => (
      <button
        key={category.id}
        className={`w-full py-2 font-medium text-left border-b border-gray-200 cursor-pointer focus:outline-none ${setSelectedCategory === category.id ? 'bg-gray-200' : 'text-gray-900'} dark:text-white dark:bg-gray-800 dark:border-gray-600 hover:bg-blue-400 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
        onClick={() => setSelectedCategory(category.id)}
      >
        {category.name}
      </button>
    ))}
  </div>
  
  
  )
}

export default Sidebar
