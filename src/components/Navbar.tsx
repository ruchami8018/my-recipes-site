import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Login from "./login/Login";
import LogUp from "./login/LogUp";
import { Box } from "@mui/material";
import Update from "./login/Update";
import { UserContext } from "../store/UserStore";
import ProfileAvatar from "./login/Avatar";
const gradients = [
  "linear-gradient(45deg, #009688, #4DB6AC, #80CBC4)",
  "linear-gradient(45deg, #00796B, #26A69A, #64B5F6)",
  "linear-gradient(45deg, #004D40, #009688, #4DB6AC)",
];
const Navbar = () => {
  const [bgGradient, setBgGradient] = useState(gradients[0]);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogUp, setShowLogUp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const {currentUser} = useContext(UserContext)
  return (
    <>
      <AppBar 
        position="fixed"  
        sx={{ 
          top: 0,  
          background: 'rgba(128, 128, 128, 0.8)',  
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
        }}
      >
        <Toolbar sx={{ 
          minHeight: '64px', 
          padding: '0 16px' 
        }}>
          <Box sx={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            alignItems: 'center',
            gap: 1 
          }}>
           { !currentUser.isLoggedIn ? <>
           <Button 
             component={RouterLink}
             to="/"
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             Home
           </Button>
           <Button 
             component={RouterLink}
             to="/about"
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             About
           </Button>
           <Button 
             onClick={() => setShowLogin(true)}
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             Log-in
           </Button>
           <Button 
             onClick={() => setShowLogUp(true)}
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             Log-up
           </Button>

           </>:<>
           <Button 
             component={RouterLink}
             to="/"
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             Home
           </Button>
           <Button 
             component={RouterLink}
             to="/about"
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             About
           </Button>
           <Button 
             onClick={() => setShowUpdate(true)}
             variant="contained"
             sx={{
               background: bgGradient,
               '&:hover': { 
                 background: gradients[1],
                 opacity: 0.9
               }
             }}
           >
             Update Details
           </Button> 
           <ProfileAvatar />
           </>
           }
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showLogUp && <LogUp onClose={() => setShowLogUp(false)} />}
      {showUpdate && <Update onClose={() => setShowUpdate(false)} />}
    </>
  );
};

export default Navbar;