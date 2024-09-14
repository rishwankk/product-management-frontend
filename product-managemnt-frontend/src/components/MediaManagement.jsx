import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductMedia = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId || !mediaFile) {
      alert('Please select a product and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('product_id', selectedProductId);
    formData.append('media', mediaFile);

    try {
      await axios.post('/api/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Media uploaded successfully!');
      setMediaFile(null);
    } catch (error) {
      console.error('Error uploading media', error);
      alert('Failed to upload media');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product Media</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_id">
            Select Product
          </label>
          <select
            name="product_id"
            id="product_id"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="media">
            Upload Media (Image)
          </label>
          <input
            type="file"
            name="media"
            id="media"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Upload Media
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductMedia;
