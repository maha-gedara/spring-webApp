import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getQuizzes } from '../services/api';
import QuizCard from '../components/QuizCard';

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-950">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-medium">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] rounded-full bg-white/5 shadow-inner" />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-purple-300">Recent Discoveries</h2>
          <div className="flex flex-col sm:flex-row gap-3">
          <button
              onClick={() => navigate('/my-quizzes')}
              className="flex items-center justify-center px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              My Quizzes
            </button>
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No quizzes available at the moment.</p>
            <p className="mt-2 text-sm text-gray-500">Be the first to create a quiz!</p>
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

export default HomePage;
