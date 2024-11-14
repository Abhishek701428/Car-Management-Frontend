import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, [searchQuery]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`https://car-management-backend.onrender.com/api/docs/cars/search?q=${searchQuery}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://car-management-backend.onrender.com/api/docs/cars/delete/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="container">
      <input 
        type="text" 
        placeholder="Search cars" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button onClick={() => fetchCars()}>Search</button>
      <button onClick={() => navigate('/add-car')}>Add Car</button> 

      <div className="product-list">
        {cars.map((car) => (
          <div key={car._id} className="product-card">
            <img src={car.images[0]} alt={car.title} style={{ width: '200px', height: '150px' }} />
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            <div>
              <button onClick={() => navigate(`/car/${car._id}`)}>View Details</button>
              <button onClick={() => navigate(`/edit-car/${car._id}`)}>Edit</button>
              <button onClick={() => handleDelete(car._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
