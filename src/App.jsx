<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignAdd from "./pages/marketplace/AssignAdd";
import AllAds from "./pages/marketplace/AllAdds";
import EditAd from "./pages/marketplace/EditAd";
import MarketplaceHeader from "./components/Marketplace/MarketplaceHeader";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import PostDetail from '../src/pages/PostDetail';
import UserPosts from '../src/pages/UserPosts';
import QuizDetail from '../src/pages/QuizDetail';
import UserQuizzes from '../src/pages/UserQuizzes';
import Marketplace from '../src/pages/Marketplace';
import AdDetail from '../src/pages/AdDetail';
import UserAds from '../src/pages/UserAds';
import { AuthProvider } from '../src/services/auth';
>>>>>>> 67dca0d1b2f7e4e5e58b02a481edc4eef57fc15c

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <MarketplaceHeader />
  
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}

          //sanduni


          //jithma


          //lakshitha

          <Route path="/create-ad" element={<AssignAdd />} />
          <Route path="/all-ads" element={<AllAds />} />
          <Route path="/edit-ad/:id" element={<EditAd />} />
          //primal
        </Routes>
      </div>
=======
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
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<AdDetail />} />
            <Route path="/my-ads" element={<UserAds />} />
          </Routes>
        </div>
      </AuthProvider>
>>>>>>> 67dca0d1b2f7e4e5e58b02a481edc4eef57fc15c
    </Router>
  );
}

export default App;