import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Login";
import Signup from "./Signup";
import Home from './Home';
import { UserLinks } from './UserLinks'
import { LandingPage } from './LandingPage'


function App() {
  
  return (
    <>
    <Router>

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<UserLinks/>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        
      </Routes>

    </Router>
    </>
  )
}

export default App
