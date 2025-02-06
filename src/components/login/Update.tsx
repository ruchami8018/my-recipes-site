import React, { FormEvent, useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import CommonModal from '../CommonModal';
const Update = ({ onClose }: { onClose: () => void }) => {
  const { currentUser, userDispatch } = useContext(UserContext);
  const lNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3000/api/user', {
        firstName: currentUser.firstName,
        lastName: lNameRef.current?.value || currentUser.lastName,
        email: emailRef.current?.value || currentUser.email,
        address: addressRef.current?.value || currentUser.address,
        phone: phoneRef.current?.value || currentUser.phone
      }, {
        headers: {
          'user-id': currentUser?.id
        }
      });
      userDispatch({
        type: 'UPDATE',
        new_data: {
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: lNameRef.current?.value || currentUser.lastName,
          passward: currentUser.passward,
          email: emailRef.current?.value || currentUser.email,
          address: addressRef.current?.value || currentUser.address,
          phone: phoneRef.current?.value || currentUser.phone
        }
      });
      alert("העדכון בוצע בהצלחה");
      onClose();
    } catch (e: any) {
      console.error('Error updating user:', e);
      alert("העדכון נכשל");
    }
  }
  return (
    <CommonModal 
      open={true} 
      onClose={onClose} 
      title="עדכון פרטים אישיים"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          inputRef={lNameRef}
          label="שם משפחה"
          variant="outlined"
          fullWidth
          defaultValue={currentUser.lastName}
        />
        <TextField
          inputRef={addressRef}
          label="כתובת"
          variant="outlined"
          fullWidth
          defaultValue={currentUser.address}
        />
        <TextField
          inputRef={emailRef}
          label="אימייל"
          type="email"
          variant="outlined"
          fullWidth
          defaultValue={currentUser.email}
        />
        <TextField
          inputRef={phoneRef}
          label="טלפון"
          type="tel"
          variant="outlined"
          fullWidth
          defaultValue={currentUser.phone}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          עדכן פרטים
        </Button>
      </form>
    </CommonModal>
  );
};
export default Update;