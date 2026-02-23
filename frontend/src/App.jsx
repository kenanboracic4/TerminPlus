import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';


import './App.css';
import IndexPage from './pages/index';
import Register from './pages/register';
import Login from './pages/login';
function App() {


  return (
    <>
    <AuthProvider>
      <Login />
    
    </AuthProvider>
    </>
  )
}

export default App
