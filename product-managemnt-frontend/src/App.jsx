import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css" 


import ProductList from './components/ProductList';
import ProductStatistics from './components/ProductStatistics';
import ProductForm from './components/ProductForm';
import CategoryManagement from './components/CategoryManagement';
import MaterialForm from './components/MaterialManagement';
import ProductMedia from './components/MediaManagement';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
        <Route path="/statistics" element={<ProductStatistics />} />
        < Route path='/category' element={<CategoryManagement />} />
        <Route path='/material' element={<MaterialForm />} />
        <Route path='/media' element={<ProductMedia />} />
        <Route path='/product-view' element={< ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
