import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtisanStartPage from './components/StartPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import ArthiveHome from './screens/Home';
import ArtisansProfiles from './screens/Artisans';
import ShopsPage from './screens/Shops';
import ChatPage from './screens/Chats';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<ArtisanStartPage />} />
        <Route path="/home" element={<ArthiveHome />} />
        <Route path="/profile" element={<ArtisansProfiles />} />
        <Route path="/shop" element={<ShopsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
