import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        images.forEach((image) => formData.append('images', image));

        try {
            await axios.post('https://car-management-backend.onrender.com/api/docs/cars/add', formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Car added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Car</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Car Title"
                    required
                    style={inputStyles}
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Car Description"
                    required
                    style={{ ...inputStyles, height: '100px' }}
                />

                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    style={inputStyles}
                />

                <div>
                    <label style={{ fontWeight: 'bold' }}>Select Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        required
                        style={inputStyles}
                    />
                </div>

                {imagePreviews.length > 0 && (
                    <div>
                        <h4>Selected Images:</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <img
                                        src={preview}
                                        alt={`preview-${index}`}
                                        style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                                    />
                                    <p>{images[index].name}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            padding: '5px',
                                            marginTop: '5px'
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Add Car
                </button>
            </form>
        </div>
    );
}

const inputStyles = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
};

export default ProductCreate;
