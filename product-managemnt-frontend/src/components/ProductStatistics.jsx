import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductStatistics = () => {
    const [stats, setStats] = useState({
        highestPriceByCategory: [],
        priceRangeCount: {},
        productsWithoutMedia: []
    });

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const result = await axios.get('/api/products/statistics');
            setStats(result.data);
        } catch (error) {
            console.error('Error fetching product statistics:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Product Statistics</h1>

            {/* Highest Price by Category */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Highest Price by Category</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {stats.highestPriceByCategory.length > 0 ? (
                        stats.highestPriceByCategory.map((category, index) => (
                            <li key={index} className="text-gray-700">
                                <span className="font-medium">{category.category_name}</span>: ₹{category.highest_price}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No data available</li>
                    )}
                </ul>
            </div>

            {/* Product Count by Price Range */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Product Count by Price Range</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {Object.keys(stats.priceRangeCount).length > 0 ? (
                        Object.keys(stats.priceRangeCount).map((range, index) => (
                            <li key={index} className="text-gray-700">
                                <span className="font-medium">{range}</span>: {stats.priceRangeCount[range]}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No data available</li>
                    )}
                </ul>
            </div>

            {/* Products without Media */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Products without Media</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {stats.productsWithoutMedia.length > 0 ? (
                        stats.productsWithoutMedia.map((product, index) => (
                            <li key={index} className="text-gray-700">
                                <span className="font-medium">{product.product_name}</span> (ID: {product.product_id})
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No products without media</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductStatistics;
