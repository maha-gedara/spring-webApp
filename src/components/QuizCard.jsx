import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toast } from 'react-toastify';

function QuizCard({ quiz }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteQuiz = async (e) => {
    // Stop event propagation to prevent navigation when clicking delete
    e.stopPropagation();
    
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You must be logged in to delete a quiz');
      return;
    }

    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await fetch(`/api/quizzes/${quiz.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete quiz');
        }

        toast.success('Quiz deleted successfully');
        navigate('/my-quizzes');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error(`Failed to delete quiz: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleEditQuiz = (e) => {
    e.stopPropagation();
    navigate(`/edit-quiz/${quiz.id}`);
  };

  // Check if the current user is the creator of this quiz
  const isOwner = user && user.email === quiz.userId;

  // Format date in a more readable format
  const formattedDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Calculate a truncated description with appropriate length
  const truncatedDescription = quiz.description.length > 120 
    ? `${quiz.description.substring(0, 120)}...` 
    : quiz.description;

  return (
    <div
      onClick={() => navigate(`/quizzes/${quiz.id}`)}
      className="bg-white/95 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden relative group border border-indigo-100 backdrop-blur-lg"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500"></div>
      
      {/* Category badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-200 text-purple-700">
          {quiz.category}
        </span>
      </div>
      
      <div className="p-6 mt-4">
        {/* Title section with icon */}
        <div className="flex items-start mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mr-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{quiz.title}</h2>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm">{truncatedDescription}</p>
        
        {/* Metadata with icons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{quiz.time} minutes</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>
        
        {/* Creator info */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Created by <span className="font-medium text-indigo-700">{quiz.userId}</span></span>
        </div>
        
        
        {/* Take quiz button - appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;