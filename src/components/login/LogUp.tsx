import React, { FormEvent, useContext, useRef } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import CommonModal from '../CommonModal';
const LogUp = ({ onClose }: { onClose: () => void }) => {
  const { userDispatch } = useContext(UserContext);
  const fNameRef = useRef<HTMLInputElement>(null);
  const passwardREf = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        firstName: fNameRef.current?.value,
        password: passwardREf.current?.value
      });
      if (res.data.userId) {
        userDispatch({
          type: 'CREATE',
          new_data: {
            id: res.data.userId.toString(),
            firstName: fNameRef.current?.value || '',
            lastName: '',
            passward: passwardREf.current?.value || '',
            email: '',
            address: '',
            phone: '',
            isLoggedIn: true
          }
        });
        alert("ההרשמה הצליחה");
        onClose();
      } else {
        alert("שגיאה בהרשמה");
      }
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message || "המשתמש כבר קיים");
      } else {
        alert("ההרשמה לא הצליחה");
      }
    }
  }
  return (
    <CommonModal 
      open={true} 
      onClose={onClose} 
      title="הרשמה"
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
          הירשם
        </Button>
      </form>
    </CommonModal>
  );
};
export default LogUp;