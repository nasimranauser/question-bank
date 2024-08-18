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


function App() {
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
bodyClassName="toastBody"
theme="light"
/>
<ToastContainer />
      <div className="app_content">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homescreen />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Register />} /> 
        <Route path="/overview/:exam/:id" element={<Examviewscreen />} /> 
        <Route path="/exam-joinned" element={<JoinScreen />} /> 
        <Route path="/question/:exam/:id" element={<Questionscreen />} />
        <Route path="/completed-exam" element={<Completedexamscreen />} /> 
        <Route path="/history" element={<HistoryScreen />} /> 
        <Route path="/my-profile" element={<AccountScreen />} /> 

      </Routes>
    </BrowserRouter>
      </div>
      </div>
   </>
  )
}

export default App
  