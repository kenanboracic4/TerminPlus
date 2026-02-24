import React, { createContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/Register.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const verifyToken = async () =>{
            if(!token){
                setLoading(false);
                return;
            }
            try{
                const response = await fetch('http://localhost:3000/user/auth', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if(response.ok){
                     
                    const data = await response.json();
                    setUserData(data);
                    setIsLoggedIn(true);
                }else{
                    localStorage.removeItem('token');
                    setToken(null);
                    setIsLoggedIn(false);
                    setUserData(null);
                }
            }catch(error){
                console.error('Error verifying token:', error);
            }finally{
                setLoading(false);
            }
        };
        verifyToken();

    },[token]);

    const login = (newToken, userData) => {
       console.log("funkcija",userData);
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUserData(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setUserData(null);
    };

    return (
       <AuthContext.Provider value={{ isLoggedIn, userData, token, login, logout, loading }}>
        {!loading ? children : <div className="spinner-container"><Spinner animation="border" role="status"/></div>}
    </AuthContext.Provider>
    );
};  