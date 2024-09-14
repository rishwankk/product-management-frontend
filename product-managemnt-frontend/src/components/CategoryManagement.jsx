import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryManagement = () => {
    const[category,setCategory]=useState([])
    const [newCategory, setNewCategory] = useState('')
    const [editingCategory, setEditingCategory] = useState(null); // For storing the category being edited
    const [updatedCategory, setUpdatedCategory] = useState('');

    const fetchCategories=async()=>{
      const result= await axios.get("/api/categories")
      setCategory(result.data);
      
    }

    const addCategory = async () => {
        
        if (!newCategory.trim()) return; 
        
        try {
          console.log(newCategory);
          
          const result = await axios.post("/api/categories", {  category_name : newCategory });
          setNewCategory(''); 
          fetchCategories(); 
          
        } catch (error) {
          console.error("Error adding category", error);
        }
      };


       // Delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories(); // Fetch updated categories after deletion
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  // Start editing a category
  const startEditCategory = (category) => {
    setEditingCategory(category.category_id);
    setUpdatedCategory(category.category_name);
  };

  // Update a category
  const updateCategory = async () => {
    if (!updatedCategory.trim()) return;
    try {
      await axios.put(`/api/categories/${editingCategory}`, { category_name: updatedCategory });
      setEditingCategory(null);
      setUpdatedCategory('');
      fetchCategories(); 
    } catch (error) {
      console.error('Error updating category', error);
    }
  };


    useEffect(()=>{
        fetchCategories()

    },[setCategory])



return (
    <div className="flex justify-between p-10 bg-gray-50 min-h-screen">
    {/* Left Section: Add Category */}
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Category</h2>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="categoryName">
          Category Name
        </label>
        <input 
          id="categoryName"
          type="text" 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Enter category name" 
        />
      </div>
      <button className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all duration-200 ease-in-out shadow-md "  onClick={addCategory}>
        Add Category
      </button>
    </div>

    {/* Right Section: Category Listing */}
    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Category List</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          {category.length === 0 ? (
            <p className="text-gray-500 text-sm">No categories added yet. Add some categories to display them here.</p>
          ) : (
            <ul>
              {category.map((category) => (
                <li key={category.category_id} className="text-gray-700 py-2 border-b border-gray-300 flex justify-between items-center">
               
                  {editingCategory === category.category_id ? (
                    <>
                      <input
                        type="text"
                        value={updatedCategory}
                        onChange={(e) => setUpdatedCategory(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-2/3"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={updateCategory}
                          className="bg-green-500 text-white py-1 px-3 rounded-md font-semibold hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="bg-gray-500 text-white py-1 px-3 rounded-md font-semibold hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{category.category_name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditCategory(category)}
                          className="bg-yellow-500 text-white py-1 px-3 rounded-md font-semibold hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category.category_id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-md font-semibold hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    
  </div>
)
}

export default CategoryManagement