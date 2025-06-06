import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstruccionesPage from './pages/InstruccionesPage';
import SimuladorPage from './pages/SimuladorPage'; 
import LoginPage from './pages/LoginPage';
import Navbar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<InstruccionesPage />} />
          <Route path="/simulador" element={<SimuladorPage />} />
           <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;