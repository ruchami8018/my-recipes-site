import React, { FormEvent, useContext, useRef } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { UserContext } from "../../store/UserStore";
import CommonModal from "../CommonModal";

const AddRecipe = ({ onClose }: { onClose: () => void }) => {
  const userContext = useContext(UserContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionREf = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:3000/api/recipes', {
            title: titleRef.current?.value,
            description: descriptionREf.current?.value,
            ingredients: ingredientsRef.current 
              ? ingredientsRef.current.value.split(',').map(i => i.trim()) 
              : [],
            instructions: instructionsRef.current?.value
        },{
          headers:{
            'user-id': userContext.currentUser?.id
          }
        })   
          
        if (res.data.message) {  // שים לב לשינוי מ-user ל-userId
            alert("המתכון נקלט בהצלחה ");
            onClose();
        }
    }
    catch(e: any) {
        alert("שגיאה בקליטת מתכון");
    }
  }

  return (
    <CommonModal 
      open={true} 
      onClose={onClose} 
      title="הוספת מתכון חדש"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          inputRef={titleRef}
          label="כותרת המתכון"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          inputRef={descriptionREf}
          label="תיאור המתכון"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          inputRef={ingredientsRef}
          label="רכיבים (הפרד בפסיק)"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          inputRef={instructionsRef}
          label="הוראות הכנה"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          שמור מתכון
        </Button>
      </form>
    </CommonModal>
  );
};

export default AddRecipe;