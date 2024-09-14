import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filters, setFilters] = useState({
    SKU: '',
    product_name: '',
    category: '',
    material: '',
    status: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const result = await axios.get('/api/products', { params: { ...filters, category_id: filters.category, material_ids: filters.material } });
      const productsWithMedia = await Promise.all(
        result.data.map(async (product) => {
          try {
            const mediaResponse = await axios.get(`/api/media/${product.product_id}`);
            const mediaUrl = mediaResponse.data.length > 0 ? mediaResponse.data[0].url : null;
            return {
              ...product,
              media: mediaUrl
            };
          } catch (mediaError) {
            console.error(`Error fetching media for product ${product.product_id}:`, mediaError);
            return {
              ...product,
              media: null
            };
          }
        })
      );
      setProducts(productsWithMedia);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch categories and materials
  const fetchCategories = async () => {
    try {
      const result = await axios.get('/api/categories');
      setCategories(result.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const result = await axios.get('/api/materials');
      setMaterials(result.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchCategories();
    fetchMaterials();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsUpdating(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${selectedProduct.product_id}`, selectedProduct);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.product_id === selectedProduct.product_id ? selectedProduct : product
          )
        );
        setIsUpdating(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleMaterialChange = (e) => {
    const { value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      material_ids: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      category_id: value
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      price: value
    }));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_id !== productId)
        );
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="SKU"
          placeholder="Filter by SKU"
          value={filters.SKU}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="product_name"
          placeholder="Filter by Product Name"
          value={filters.product_name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
        <select
          name="material"
          value={filters.material}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Material</option>
          {materials.map((mat) => (
            <option key={mat.material_id} value={mat.material_id}>
              {mat.material_name}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-gray-700">Image</th>
              <th className="p-4 text-left text-gray-700">SKU</th>
              <th className="p-4 text-left text-gray-700">Product Name</th>
              <th className="p-4 text-left text-gray-700">Category</th>
              <th className="p-4 text-left text-gray-700">Material</th>
              <th className="p-4 text-left text-gray-700">Price</th>
              <th className="p-4 text-left text-gray-700">Status</th>
              <th className="p-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const categoryName = categories.find(
                (cat) => cat.category_id === product.category_id
              )?.category_name || 'Unknown';

              const materialNames = product.material_ids
                .split(',')
                .map((id) => materials.find((mat) => mat.material_id === parseInt(id)))
                .filter(Boolean)
                .map((mat) => mat.material_name)
                .join(', ') || 'Unknown';

              const imageUrl = product.media ? `/api/${product.media}` : 'https://via.placeholder.com/150'; // Placeholder if no media

              return (
                <tr key={product.product_id} className="border-b border-gray-200">
                  <td className="p-4">
                    <img src={imageUrl} alt={product.product_name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="p-4">{product.SKU}</td>
                  <td className="p-4">{product.product_name}</td>
                  <td className="p-4">{categoryName}</td>
                  <td className="p-4">{materialNames}</td>
                  <td className="p-4">{product.price}</td>
                  <td className="p-4">{product.status}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleUpdateClick(product)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.product_id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdating && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="product_name"
                value={selectedProduct.product_name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={selectedProduct.category_id}
                onChange={handleCategoryChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Material</label>
              <select
                name="material"
                value={selectedProduct.material_ids}
                onChange={handleMaterialChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Material</option>
                {materials.map((mat) => (
                  <option key={mat.material_id} value={mat.material_id}>
                    {mat.material_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handlePriceChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsUpdating(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
