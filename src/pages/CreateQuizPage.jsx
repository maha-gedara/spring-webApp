import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../services/api';
import QuizForm from '../components/QuizForm';
import { toast } from 'react-toastify';

function CreateQuizPage() {
  const navigate = useNavigate();

  const handleCreateQuiz = async (formData) => {
    try {
      const response = await createQuiz(formData);
      toast.success('Quiz created successfully!');
      navigate('/my-quizzes');
    } catch (error) {
      toast.error('Failed to create quiz.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 shadow-inner" />
      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] rounded-full bg-white/5 shadow-inner" />
      
      <div className="w-full max-w-4xl relative z-20">
        <QuizForm onSubmit={handleCreateQuiz} />
      </div>
    </div>
  );
}

export default CreateQuizPage;
