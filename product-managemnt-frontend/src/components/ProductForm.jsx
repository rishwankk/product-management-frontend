import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState({
    SKU: '',
    product_name: '',
    category_id: '',
    material_ids: [],
    price: ''
  });
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  const fetchCategoriesAndMaterials = async () => {
    try {
      const categoryResult = await axios.get('/api/categories');
      const materialResult = await axios.get('/api/materials');
      setCategories(categoryResult.data);
      setMaterials(materialResult.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/products/${id}`, product);
      } else {
        await axios.post('/api/products', product);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

 
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMaterialChange = (e) => {
    const selectedMaterials = Array.from(e.target.selectedOptions, option => option.value);
    setProduct({ ...product, material_ids: selectedMaterials });
  };

  useEffect(() => {
    fetchCategoriesAndMaterials();
    if (id) {
  
      axios.get(`/api/products/${id}`).then((response) => setProduct(response.data));
    }
  }, [id]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        {/* SKU */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SKU">
            SKU
          </label>
          <input
            type="text"
            name="SKU"
            id="SKU"
            value={product.SKU}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Enter SKU"
            required
          />
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_name">
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            value={product.product_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
            Category
          </label>
          <select
            name="category_id"
            id="category_id"
            value={product.category_id}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Materials */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="material_ids">
            Materials
          </label>
          <select
            name="material_ids"
            id="material_ids"
            multiple
            value={product.material_ids}
            onChange={handleMaterialChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          >
            {materials.map((material) => (
              <option key={material.material_id} value={material.material_id}>
                {material.material_name}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-sm">Hold down the Ctrl (Windows) or Command (Mac) button to select multiple materials.</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {id ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
