import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        fetchCar();
    }, []);

    const fetchCar = async () => {
        try {
            const response = await axios.get(`https://car-management-backend.onrender.com/api/docs/cars/get/${id}`, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
            });
            const { title, description, tags, images } = response.data;
            setTitle(title);
            setDescription(description);
            setTags(tags.join(', '));
            setExistingImages(images);
        } catch (error) {
            console.error('Error fetching car:', error);
        }
    };

    const handleImageChange = (e) => {
        setImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
    };

    const handleRemoveImage = (imgUrl) => {
        // Removing the image from the existingImages array
        setExistingImages(existingImages.filter((img) => img !== imgUrl));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
   
        images.forEach((image) => formData.append('images', image));
      
        existingImages.forEach((img) => formData.append('existingImages', img));

        try {
            await axios.put(`https://car-management-backend.onrender.com/api/docs/cars/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Car updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Edit Car</h2>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Car Title"
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Car Description"
                    required
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', height: '100px' }}
                />

                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />

                <div>
                    <h4>Existing Images:</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {existingImages.map((imgUrl, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <img
                                    src={imgUrl}
                                    alt={`car-${index}`}
                                    style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(imgUrl)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageChange(e)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Update Car
                </button>
            </form>
        </div>
    );
}

export default EditCar;
