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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold">{isEditing ? 'Edit Ad' : 'Create Ad'}</h2>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images (up to 3)
        </label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
        {initialData.imageUrls && isEditing && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Existing Images:</p>
            <div className="flex space-x-2">
              {initialData.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Ad ${index}`} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading || !user}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Ad' : 'Create Ad'}
      </button>
    </form>
  );
}

export default AdForm;