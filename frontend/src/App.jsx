import { useState , useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import './App.css';
import IndexPage from './pages/index';
import Register from './pages/register';
import Login from './pages/login';
import Matches from './pages/matches';



const ProtectedRoute = ({ children }) => {
  const {token} = useContext(AuthContext);
  
  if (!token) {
    
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<IndexPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
         
          <Route 
            path="/matches" 
            element={
              <ProtectedRoute>
                <Matches />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;