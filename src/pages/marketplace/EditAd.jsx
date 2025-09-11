import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/api/marketplace/${id}`);
        setAd(response.data);
        setCategory(response.data.category);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        console.error('Failed to fetch ad:', err);
      }
    };

    fetchAd();
  }, [id]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image) => formData.append('images', image));

    try {
      const response = await axios.put(`/api/marketplace/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Ad updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update ad.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ad?')) return;
    try {
      await axios.delete(`/api/marketplace/${id}`);
      navigate('/all-ads');
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete ad.');
    }
  };

  if (!ad) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Edit Ad</h1>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          rows="4"
          required
        ></textarea>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update Ad
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Ad
      </button>
    </div>
  );
};

export default EditAd;
