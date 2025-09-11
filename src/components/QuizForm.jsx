import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth'; // Assuming you have AuthContext

function QuizForm({ onSubmit, initialData = {}, isEditing = false, onCancel }) {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  // Set initial values only on mount or when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || '');
      setDescription(initialData.description || '');
      setTime(initialData.time || '');
      setLink(initialData.link || '');
    }
  }, [initialData, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to create or edit a quiz');
      return;
    }

    const formData = {
      title,
      category,
      description,
      time,
      link,
      userId: user.email,
      createdAt: isEditing ? initialData.createdAt : new Date().toISOString(),
    };

    setLoading(true);
    try {
      // Call the onSubmit prop function (either create or update)
      await onSubmit(formData);
      
      toast.success(isEditing ? 'Quiz updated!' : '');

      if (!isEditing) {
        // Reset form only if creating a new quiz
        setTitle('');
        setCategory('');
        setDescription('');
        setTime('');
        setLink('');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error(isEditing ? 'Failed to update quiz' : 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center box-border overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl overflow-y-auto bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg border border-white/20"
      >
        <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent text-center">
          {isEditing ? 'Edit Quiz' : 'Create Quiz'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="font-semibold text-sm mb-2 block">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz Title"
              required
              className="w-full p-2 rounded-lg border border-gray-300 mb-4 bg-opacity-80"
            />
          </div>
          <div>
            <label htmlFor="category" className="font-semibold text-sm mb-2 block">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Science"
              required
              className="w-full p-2 rounded-lg border border-gray-300 mb-4 bg-opacity-80"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="font-semibold text-sm mb-2 block">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this quiz about?"
            required
            className="w-full p-2 rounded-lg border border-gray-300 mb-4 bg-opacity-80 resize-y min-h-[6rem]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="time" className="font-semibold text-sm mb-2 block">
              Time (minutes)
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="1"
              placeholder="Duration"
              required
              className="w-full p-2 rounded-lg border border-gray-300 mb-4 bg-opacity-80"
            />
          </div>
          <div>
            <label htmlFor="link" className="font-semibold text-sm mb-2 block">
              Quiz Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full p-2 rounded-lg border border-gray-300 mb-4 bg-opacity-80"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !user}
          className={`w-full py-3 rounded-lg font-semibold ${
            loading || !user ? 'bg-purple-200 cursor-not-allowed' : 'bg-purple-700 text-white'
          } mt-4`}
        >
          {loading ? 'Processing...' : isEditing ? 'Update Quiz' : 'Create Quiz'}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full mt-2 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default QuizForm;