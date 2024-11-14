import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import Auth from './component/Auth';
import ProductList from './component/ProductList';
import ProductCreate from './component/ProductCreate';
import ProductDetail from './component/ProductDetails';
import EditCar from './component/Editcar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth mode="login" setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth mode="register" setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-car"
          element={isAuthenticated ? <ProductCreate /> : <Navigate to="/login" />}
        />
        <Route
          path="/car/:id"
          element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route path="/edit-car/:id" element={isAuthenticated ? <EditCar /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
