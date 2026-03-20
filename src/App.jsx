import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import TarotApp from './pages/TarotApp';
import Login from './pages/Login';
import Admin from './pages/Admin';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/admin" element={<Admin />} />
        <Route 
          path="/" 
          element={
            isAuthenticated ? <TarotApp /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;