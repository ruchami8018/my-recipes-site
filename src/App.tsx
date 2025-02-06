import React, { useContext, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import Login from "./components/login/Login";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { UserContext } from "./store/UserStore";
import { userReducer } from './store/UserStore';
import { User } from './models/User'
import { ThemeProvider } from '@mui/material/styles';
import theme from './them/Theme';

const initialState: User = {
  id: '',
  firstName: '',
  lastName: '',
  passward: '',
  email: '',
  address: '',
  phone: '',
  isLoggedIn: false
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, userDispatch] = useReducer(userReducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ currentUser: user, userDispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onClose={() => setShowLogin(false)} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App;
