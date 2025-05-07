import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';

function AdForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [category, setCategory] = useState(initialData.category || '');
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + (initialData.imageUrls?.length || 0) - images.length > 3) {
      toast.error('You can upload a maximum of 3 images');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to create an ad');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('title', title);
      formData.append('description', description);
      images.forEach((image) => formData.append('images', image));

      await onSubmit(formData, isEditing ? initialData.id : null);
      toast.success(isEditing ? 'Ad updated!' : 'Ad created!');
      if (!isEditing) {
        setCategory('');
        setTitle('');
        setDescription('');
        setImages([]);
      }
    } catch (error) {
      console.error('Error submitting ad:', error.response?.data || error.message);
      toast.error(isEditing ? 'Failed to update ad' : 'Failed to create ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gray-900 bg-opacity-80 text-white p-6 rounded-2xl shadow-md backdrop-blur-md border border-indigo-500 mt-6"
    >
      <h2 className="text-2xl font-bold">
        {isEditing ? 'Edit Ad' : 'Create Ad'}
      </h2>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-indigo-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-indigo-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-indigo-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium mb-1">
          Images (up to 3)
        </label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-white bg-gray-800 rounded-md border border-indigo-500 file:bg-indigo-600 file:border-none file:rounded file:px-3 file:py-1 file:text-white hover:file:bg-indigo-500"
        />
        {initialData.imageUrls && isEditing && (
          <div className="mt-3">
            <p className="text-sm text-gray-400 mb-2">Existing Images:</p>
            <div className="flex space-x-3">
              {initialData.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Ad ${index}`}
                  className="w-20 h-20 object-cover rounded-md border border-indigo-500 shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !user}
        className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Ad' : 'Create Ad'}
      </button>
    </form>
  );
}

export default AdForm;