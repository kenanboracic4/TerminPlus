import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import './App.css';
import IndexPage from './pages/index';
import Register from './pages/register';
import Login from './pages/login';
import Matches from './pages/matches';

function App() {


  return (
    <>
    <BrowserRouter>
    <AuthProvider>
     
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    
    </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
