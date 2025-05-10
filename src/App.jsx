import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import PostDetail from '../src/pages/PostDetail';
import UserPosts from '../src/pages/UserPosts';
import QuizDetail from '../src/pages/QuizDetail';
import UserQuizzes from '../src/pages/UserQuizzes';
import QuizHome from './pages/QuizHome';
import CreateQuizPage from './pages/CreateQuizPage';
import { AuthProvider } from '../src/services/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/my-posts" element={<UserPosts />} />
            <Route path="/quizzes/:id" element={<QuizDetail />} />
            <Route path="/my-quizzes" element={<UserQuizzes />} />
            <Route path="/quizzes" element={<QuizHome />} />
            <Route path="/quiz/create" element={<CreateQuizPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;