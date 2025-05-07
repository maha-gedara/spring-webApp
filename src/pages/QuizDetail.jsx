import { useEffect, useState, useContext } from 'react';
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
        navigate('/my-quizzes');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error('Failed to delete quiz');
      }
    }
  };

  const handleUpdateQuiz = async (formData) => {
    try {
      const updatedQuiz = await updateQuiz(id, formData);
      setQuiz(updatedQuiz);
      setIsEditing(false);
      toast.success('Quiz updated successfully');
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast.error('Failed to update quiz');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!quiz) return <div className="text-center mt-8">Quiz not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      {isEditing ? (
        <QuizForm
          onSubmit={handleUpdateQuiz}
          initialData={quiz}
          isEditing={true}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {quiz.category}</p>
          <p className="text-gray-700 mb-4">{quiz.description}</p>
          <p className="text-gray-700 mb-2"><strong>Time:</strong> {quiz.time} minutes</p>
          <p className="text-gray-700 mb-4">
            <strong>Link:</strong>{' '}
            <a href={quiz.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Take Quiz
            </a>
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Created by {quiz.userId} on {new Date(quiz.createdAt).toLocaleDateString()}
          </p>
          {user && user.email === quiz.userId && (
            <div className="flex space-x-4 mb-4">
              <button onClick={() => setIsEditing(true)} className="text-purple-500 hover:underline">Edit Quiz</button>
              <button onClick={handleDeleteQuiz} className="text-purple-500 hover:underline">Delete Quiz</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default QuizDetail;
