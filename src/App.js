import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LogInForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Preferences from './components/Preferences';


const App = () => {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




