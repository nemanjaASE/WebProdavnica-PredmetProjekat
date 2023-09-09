import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AuthContext from "../../contexts/auth-context";


export default function NavBar() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleHomeClick = async () => {
        navigate('/dashboard');
    }

    const handleLogoutClick = async () => {
        authContext.onLogout();
    }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{backgroundColor: 'crimson', borderRadius: '0px 0px 30px'}}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color='inherit' sx={{ 
            "&:hover": {
                fontSize: "15px",
              },}} onClick={handleHomeClick}>Početna</Button>
          <div style={{fontFamily: "Garamond", fontSize: "30px"}}>WEB PRODAVNICA.</div>
          <Button color="inherit" sx={{ 
            "&:hover": {
                fontSize: "15px",
              },}}
          onClick={handleLogoutClick}>Odjava</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}