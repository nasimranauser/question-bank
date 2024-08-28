import React from 'react'
import Homescreen from './pages/Homescreen'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Examviewscreen from './pages/Examviewscreen'
import Questionscreen from './pages/Questionscreen'
import Register from './pages/Register'

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinScreen from './pages/Joinexamscreen';
import Completedexamscreen from './pages/Completedexamscreen';
import HistoryScreen from './pages/Historyscreen';
import AccountScreen from './pages/Accountscreen';
import ErrorScreen from './pages/ErrorScreen';
import LoginScreen from './pages/LoginScreen';
import { Logout } from './pages/Logout';
import HomeRoute from './pages/HomeRoute';
import Examfinisehd from './pages/Examfinisehd';


function App() {
  // live getting internet status.
  return (
   <>
     <div className="app_container">
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer />
      <div className="app_content">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homescreen />} /> 
        <Route path="/home" element={<HomeRoute />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<LoginScreen />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/overview/:exam/:id" element={<Examviewscreen />} /> 
        <Route path="/exam-joinned" element={<JoinScreen />} /> 
        <Route path="/exam-finished" element={<Examfinisehd />} /> 
        <Route path="/question/:exam/:id" element={<Questionscreen />} />
        <Route path="/completed-exam" element={<Completedexamscreen />} /> 
        <Route path="/history" element={<HistoryScreen />} /> 
        <Route path="/my-profile" element={<AccountScreen />} /> 
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
      </div>
      </div>
   </>
  )
}

export default App
  