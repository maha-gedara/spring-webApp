import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

function QuizCard({ quiz }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3
        className="text-xl font-semibold mb-2 cursor-pointer hover:underline"
        onClick={() => navigate(`/quizzes/${quiz.id}`)}
      >
        {quiz.title}
      </h3>
      <p className="text-gray-700 mb-2"><strong>Category:</strong> {quiz.category}</p>
      <p className="text-gray-700 mb-2">{quiz.description.substring(0, 100)}...</p>
      <p className="text-gray-700 mb-2"><strong>Time:</strong> {quiz.time} minutes</p>
      <p className="text-gray-500 text-sm mb-2">
        Created by {quiz.userId} on {new Date(quiz.createdAt).toLocaleDateString()}
      </p>
      {user && user.email === quiz.userId && (
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/quizzes/edit/${quiz.id}`)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => navigate(`/quizzes/${quiz.id}`)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizCard;