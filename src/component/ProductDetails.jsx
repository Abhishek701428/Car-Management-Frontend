import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`https://car-management-backend.onrender.com/api/docs/cars/get/${id}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        setCar(response.data);
        
        const userId = sessionStorage.getItem('userId'); 
        if (response.data.userId === userId) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://car-management-backend.onrender.com/api/docs/cars/delete/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/add-car?id=${id}`);
  };

  return (
    <div>
      {car ? (
        <div>
          <h2>{car.title}</h2>
          {car.images.map((image, index) => (
            <img key={index} src={image} alt={`${car.title} - ${index + 1}`} width="300" />
          ))}
          <p>{car.description}</p>
          <p><strong>Tags:</strong> {car.tags}</p>
          {isOwner && (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
