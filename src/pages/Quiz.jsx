import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuiz = {
      title,
      category,
      description,
      time: parseInt(time),
      createdAt: new Date().toISOString(),
      userId: 'example@example.com', // Replace with actual logged-in user email
    };

    try {
      const response = await fetch('http://localhost:8080/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuiz),
      });

      if (response.ok) {
        navigate('/quizzes'); // Go back to the quiz list page
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Time (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizForm;
