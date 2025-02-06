import React, { FormEvent, useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../CommonModal';
const Login = ({ onClose }: { onClose: () => void }) => {
  const {userDispatch} = useContext(UserContext);
  const fNameRef = useRef<HTMLInputElement>(null);
  const passwardREf = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/login',
       {
        firstName: fNameRef.current?.value,
        password: passwardREf.current?.value
       }) 
        userDispatch({
         type: 'CREATE',
         new_data: {
           id: res.data.user.id || '',
           firstName: res.data.user.firstName || fNameRef.current?.value || '',
           lastName: res.data.user.lastName || '',
           passward: passwardREf.current?.value || '',
           email: res.data.user.email || '',
           address: res.data.user.address || '',
           phone: res.data.user.phone || '',
           isLoggedIn: true
          }
        });
        onClose();
      }
      catch(e: any) {
        if(e.status === 401) {
            alert("שם משתמש או סיסמה אינם נכונים");
        }
    }
  }
  return (
    <CommonModal 
      open={true} 
      onClose={onClose} 
      title="התחברות"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          inputRef={fNameRef}
          label="שם פרטי"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          inputRef={passwardREf}
          label="סיסמה"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          התחבר
        </Button>
      </form>
    </CommonModal>
  );
};
export default Login;