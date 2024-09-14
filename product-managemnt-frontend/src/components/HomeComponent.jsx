import React from 'react'
import { Link } from 'react-router-dom'

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link
          to="/add-product"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add Product</h2>
          <p className="text-gray-700">Create a new product listing and manage your inventory efficiently.</p>
        </Link>
        <Link
          to="/edit-product/1"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Edit Product</h2>
          <p className="text-gray-700">Update product details, categories, and materials with ease.</p>
        </Link>
        <Link
          to="/statistics"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Product Statistics</h2>
          <p className="text-gray-700">View detailed statistics and insights on your products.</p>
        </Link>
        <Link
          to="/category"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Category Management</h2>
          <p className="text-gray-700">Organize and manage product categories efficiently.</p>
        </Link>
        <Link
          to="/material"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Material Form</h2>
          <p className="text-gray-700">Manage and add new materials used in your products.</p>
        </Link>
        <Link
          to="/media"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Product Media</h2>
          <p className="text-gray-700">Upload and manage media files associated with your products.</p>
        </Link>
        <Link
          to="/product-view"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Product List</h2>
          <p className="text-gray-700">View and manage your entire list of products.</p>
        </Link>
      </div>
    </div>
  )
}

export default HomeComponent