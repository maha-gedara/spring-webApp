import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';

function QuizForm({ onSubmit, initialData = {}, isEditing = false, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTitle(initialData.title || '');
    setCategory(initialData.category || '');
    setDescription(initialData.description || '');
    setTime(initialData.time || '');
    setLink(initialData.link || '');
  }, [initialData]);

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
      await onSubmit(formData);
      toast.success(isEditing ? 'Quiz updated!' : 'Quiz created!');

      if (!isEditing) {
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

  const inputClasses = "w-full p-3 rounded-lg border border-purple-200 mb-1 bg-white/90 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none shadow-sm";
  const labelClasses = "font-medium text-sm mb-2 block text-indigo-700";

  return (
    <div className="flex justify-center items-center box-border overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-xl"></div>
      <div className="absolute bottom-[-80px] left-[-80px] w-[160px] h-[160px] rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-400/30 blur-xl"></div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-3xl overflow-y-auto bg-white/80 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-indigo-100 relative z-10">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 rounded-t-lg"></div>
        
        <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center">
          {isEditing ? 'Edit Your Quiz' : 'Create Your Quiz Experience'}
        </h2>
        
        <p className="text-center text-gray-600 mb-8">
          {isEditing 
            ? "Refine your quiz details to make it even better!" 
            : "Share your knowledge by creating an engaging quiz for others to enjoy."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="group">
            <label htmlFor="title" className={labelClasses}>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Quiz Title
              </span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title"
              required
              className={inputClasses}
            />
            <p className="text-xs text-gray-500 mt-1 ml-1">Make it engaging and descriptive</p>
          </div>
          <div className="group">
            <label htmlFor="category" className={labelClasses}>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Category
              </span>
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Science, History, Pop Culture"
              required
              className={inputClasses}
            />
            <p className="text-xs text-gray-500 mt-1 ml-1">Choose a relevant category</p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className={labelClasses}>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this quiz about? What will users learn?"
            required
            className={`${inputClasses} resize-y min-h-[8rem]`}
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">Provide a compelling description to attract participants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group">
            <label htmlFor="time" className={labelClasses}>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Time (minutes)
              </span>
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="1"
              placeholder="Duration in minutes"
              required
              className={inputClasses}
            />
            <p className="text-xs text-gray-500 mt-1 ml-1">How long will it take to complete?</p>
          </div>
          <div className="group">
            <label htmlFor="link" className={labelClasses}>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Quiz Link
              </span>
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/quiz"
              required
              className={inputClasses}
            />
            <p className="text-xs text-gray-500 mt-1 ml-1">URL where users can take the quiz</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            type="submit"
            disabled={loading || !user}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold ${loading || !user ? 
              'bg-purple-200 cursor-not-allowed' : 
              'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform transition-all duration-200 hover:shadow-lg'}`}
          >
            <span className="flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isEditing ? 'Update Quiz' : 'Create Quiz'}
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </>
              )}
            </span>
          </button>

          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
        
        {!user && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Please log in to create or edit a quiz
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default QuizForm;