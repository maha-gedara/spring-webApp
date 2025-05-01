import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';

function QuizForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [time, setTime] = useState(initialData.time || '');
  const [link, setLink] = useState(initialData.link || '');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to create a quiz');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('time', time);
      formData.append('link', link);

      await onSubmit(formData, isEditing ? initialData.id : null);
      toast.success(isEditing ? 'Quiz updated!' : 'Quiz created!');
      if (!isEditing) {
        setTitle('');
        setCategory('');
        setDescription('');
        setTime('');
        setLink('');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error.response?.data || error.message);
      toast.error(isEditing ? 'Failed to update quiz' : 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold">{isEditing ? 'Edit Quiz' : 'Create Quiz'}</h2>
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
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time (minutes)
        </label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Quiz Link
        </label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !user}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Quiz' : 'Create Quiz'}
      </button>
    </form>
  );
}

export default QuizForm;