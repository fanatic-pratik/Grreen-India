import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import About from './pages/About';
import Login from './pages/login';
import Register from './pages/Register';
import HowItWorks from './pages/HowItWorks';
import Impact from './pages/Impact';
import FAQ from './pages/FAQ';
import ChallengePage from './pages/ChallengeApp.jsx'; // <-- New import
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>}/>
          <Route path="/impact" element={<Impact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/challenge" element={<ChallengePage />} /> {/* <-- New Route */}
          <Route path="/how-it-works" element={<HowItWorks/>}/>

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
