import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getUserQuizzes, createQuiz } from '../services/api';
import QuizForm from '../components/QuizForm';
import QuizCard from '../components/QuizCard';

function UserQuizzes() {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCreateQuiz = async (formData) => {
    try {
      const response = await createQuiz(formData);
      setQuizzes([response.quiz, ...quizzes]);
    } catch (error) {
      throw error;
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Please log in to view your quizzes.</div>;
  }

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
      <QuizForm onSubmit={handleCreateQuiz} />
      {quizzes.length === 0 ? (
        <p className="text-gray-500 mt-4">You haven't created any quizzes yet.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserQuizzes;