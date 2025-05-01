import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPosts, createPost, getQuizzes, createQuiz } from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import QuizForm from '../components/QuizForm';
import QuizCard from '../components/QuizCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, quizData] = await Promise.all([getPosts(), getQuizzes()]);
        setPosts(postData);
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load posts or quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async (formData) => {
    try {
      const response = await createPost(formData);
      setPosts([response.post, ...posts]);
    } catch (error) {
      throw error;
    }
  };

  const handleCreateQuiz = async (formData) => {
    try {
      const response = await createQuiz(formData);
      setQuizzes([response.quiz, ...quizzes]);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error refreshing posts:', error);
      toast.error('Failed to refresh posts');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <PostForm onSubmit={handleCreatePost} />
      <QuizForm onSubmit={handleCreateQuiz} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={handleUpdatePosts} />
          ))}
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes available.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;