import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MaterialForm = () => {
  const [material, setMaterial] = useState({
    material_name: '',
    material_id: null, // For updating purposes
  });
  const [materials, setMaterials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

 
  const fetchMaterials = async () => {
    try {
      const result = await axios.get('/api/materials');
      setMaterials(result.data);
    } catch (error) {
      console.error('Error fetching materials', error);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing) {
      try {
        await axios.put(`/api/materials/${material.material_id}`, { material_name: material.material_name });
        setIsEditing(false); 
      } catch (error) {
        console.error('Error updating material', error);
      }
    } else {
    
      try {
        await axios.post('/api/materials', { material_name: material.material_name });
      } catch (error) {
        console.error('Error adding material', error);
      }
    }
    
    setMaterial({ material_name: '', material_id: null });
    fetchMaterials(); 
  };


  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleEdit = (materialItem) => {
    setMaterial({ material_name: materialItem.material_name, material_id: materialItem.material_id });
    setIsEditing(true); 
  };

  const handleDelete = async (materialId) => {
    try {
      await axios.delete(`/api/materials/${materialId}`);
      fetchMaterials(); 
    } catch (error) {
      console.error('Error deleting material', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="flex justify-between p-10 bg-gray-50 min-h-screen">
   
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit Material' : 'Add New Material'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="material_name">
              Material Name
            </label>
            <input
              type="text"
              id="material_name"
              name="material_name"
              value={material.material_name}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter material name"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition-all duration-200 ease-in-out shadow-md ${
              isEditing ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isEditing ? 'Update Material' : 'Add Material'}
          </button>
        </form>
      </div>

      
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Material List</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          {materials.length === 0 ? (
            <p className="text-gray-500 text-sm">No materials added yet. Add some materials to display them here.</p>
          ) : (
            <ul>
              {materials.map((materialItem) => (
                <li key={materialItem.material_id} className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-700">{materialItem.material_name}</span>
                  <div className="space-x-3">
                    <button
                      onClick={() => handleEdit(materialItem)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(materialItem.material_id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
