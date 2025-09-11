import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getQuizById, updateQuiz, deleteQuiz } from '../services/api';
import QuizForm from '../components/QuizForm';

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await getQuizById(id);
        setQuiz(quizData);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        toast.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleDeleteQuiz = async () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        toast.success('Quiz deleted successfully');
        navigate('/quizzes');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error('Failed to delete quiz');
      }
    }
  };

  const handleUpdateQuiz = async (formData) => {
    try {
      // Check if formData is already a FormData object
      let dataToSend;
      
      if (formData instanceof FormData) {
        dataToSend = formData;
        // Make sure the userId is included
        if (!dataToSend.has('userId')) {
          dataToSend.append('userId', quiz.userId);
        }
      } else {
        // Create a new FormData object
        dataToSend = new FormData();
        
        // Add all form fields to the FormData
        Object.entries(formData).forEach(([key, value]) => {
          dataToSend.append(key, value);
        });
        
        // Ensure userId is included
        if (!dataToSend.has('userId')) {
          dataToSend.append('userId', quiz.userId);
        }
      }
      
      // Send the FormData to the API
      const updatedQuiz = await updateQuiz(id, dataToSend);
      
      // Update local state with the response data
      setQuiz(updatedQuiz);
      setIsEditing(false);
      
      // Redirect to the quizzes page after successful update
      navigate('/quizzes');
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast.error(error.response?.data?.message || 'Failed to update quiz');
    }
  };

  // Format date in a more readable format
  const formattedDate = quiz ? new Date(quiz.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-300 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/5 shadow-inner" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 shadow-inner" />

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center border border-white/20 shadow-xl max-w-lg w-full relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mt-4">Quiz Not Found</h2>
          <p className="text-purple-200 mt-2">The quiz you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate a truncated description for preview
  const truncatedDescription = quiz.description.length > 120
    ? `${quiz.description.substring(0, 120)}...`
    : quiz.description;

  // Check if the current user is the creator of this quiz
  const isOwner = user && user.email === quiz.userId;

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 shadow-inner" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-300 hover:text-white mb-6 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        {isEditing ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 border border-indigo-100 shadow-xl">
            <QuizForm
              onSubmit={handleUpdateQuiz}
              initialData={quiz}
              isEditing={true}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center box-border overflow-hidden relative">
            {/* Decorative elements similar to QuizForm */}
            <div className="absolute top-[-100px] right-[-100px] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-xl"></div>
            <div className="absolute bottom-[-80px] left-[-80px] w-[160px] h-[160px] rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-400/30 blur-xl"></div>

            <div className="w-full max-w-3xl bg-white/80 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-indigo-100 relative z-10">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 rounded-t-lg"></div>

              {/* Title with category badge */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {quiz.title}
                </h2>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/30 text-purple-700">
                  {quiz.category}
                </span>
              </div>

              {/* Description */}
              <div className="bg-indigo-50/70 rounded-lg p-6 mb-6 border border-indigo-100">
                <p className="text-gray-700">{quiz.description}</p>
              </div>

              {/* Metadata with icons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{quiz.time} minutes</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Creator info */}
              <div className="flex items-center text-gray-600 text-sm mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Created by <span className="font-medium text-indigo-700">{quiz.userId}</span></span>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-6 border-t border-indigo-100 pt-6">
                {isOwner && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200 shadow-sm"
                      title="Edit Quiz"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleDeleteQuiz}
                      className="w-10 h-10 mr-5 flex items-center justify-center bg-purple-50 text-purple-500 rounded-full hover:bg-purple-100 transition-colors duration-200 shadow-sm"
                      title="Delete Quiz"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}

                <a
                  href={quiz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 text-center transform transition-all duration-200 hover:shadow-lg flex items-center justify-center"
                >
                  <span>Take Quiz</span>
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizDetail;