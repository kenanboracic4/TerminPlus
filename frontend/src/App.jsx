import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';


import './App.css';
import IndexPage from './pages/index';
import Register from './pages/register';
import Login from './pages/login';
import Matches from './pages/matches';

function App() {


  return (
    <>
    <AuthProvider>
      <Matches />
      <Login />
    
    </AuthProvider>
    </>
  )
}

export default App
