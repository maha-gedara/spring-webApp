import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getUserQuizzes } from '../services/api';
import QuizCard from '../components/QuizCard';

function UserQuizzes() {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-950 text-white">
        Please log in to view your quizzes.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    
    <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] rounded-full bg-white/5 shadow-inner" />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-300 hover:text-white mb-6 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-purple-300">My Quizzes</h2>
          <button
            onClick={() => navigate('/quiz/create')}
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="mt-4 text-lg">You haven't created any quizzes yet.</p>
            <p className="mt-2 text-sm text-gray-500">Start by clicking "Create Quiz" above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserQuizzes;
