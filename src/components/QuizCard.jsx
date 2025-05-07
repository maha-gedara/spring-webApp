import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toast } from 'react-toastify';

function QuizCard({ quiz }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteQuiz = async () => {
    const token = localStorage.getItem('token'); // Retrieve token for auth

    if (!token) {
      toast.error('You must be logged in to delete a quiz');
      console.log('No token found in localStorage');
      return;
    }

    console.log('Token found:', token);  // Debug: Check if token is retrieved

    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await fetch(`/api/quizzes/${quiz.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // If the response is not OK, throw an error with the response message
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete quiz');
        }

        toast.success('Quiz deleted successfully');
        // Navigate to the quizzes list after deletion
        navigate('/my-quizzes');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error(`Failed to delete quiz: ${error.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate(`/quizzes/${quiz.id}`)}>
        {quiz.title}
      </div>
      <div className="text-gray-600 mt-2">
        Category: <span className="font-semibold">{quiz.category}</span>
      </div>
      <div className="text-gray-700 mt-2">
        {quiz.description.substring(0, 100)}...
      </div>
      <div className="text-gray-600 mt-2">
        Time: <span className="font-semibold">{quiz.time}</span> minutes
      </div>
      <div className="text-gray-600 mt-2">
        Created by <span className="font-semibold">{quiz.userId}</span> on{' '}
        <span className="font-semibold">{new Date(quiz.createdAt).toLocaleDateString()}</span>
      </div>
      {user && user.email === quiz.userId && (
        <div className="mt-4 flex space-x-4">
          <label
            onClick={() => navigate(`/quizzes/edit/${quiz.id}`)}
            className="cursor-pointer flex items-center text-purple-500 hover:text-purple-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.731 3.731m0 5.042L21 12m-5.042 5.042l3.731 3.731m-3.731-3.731L12 21m-1.414-1.414L6 12m5.042-5.042a7 7 0 11-14.126 0 7 7 0 0114.126 0z" />
            </svg>
            <span className="ml-2">Edit</span>
          </label>
          <label
            onClick={handleDeleteQuiz}
            className="cursor-pointer flex items-center text-purple-500 hover:text-purple-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="ml-2">Delete</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
