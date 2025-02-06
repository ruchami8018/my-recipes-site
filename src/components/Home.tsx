import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import RecipeList from './recipes/RecipesList';
import { UserContext } from '../store/UserStore';
import AddRecipe from './recipes/AddRecipe';
const Home = () => {
  const {currentUser} = useContext(UserContext);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  return (
    <>
      <h1>R&S</h1>
      <h2>אתר המתכונים שלי</h2>
      {currentUser.isLoggedIn && (
        <div style={{ textAlign: 'right', margin: '10px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowAddRecipe(true)}
          >
            הוסף מתכון
          </Button>
        </div>
      )}   
      <RecipeList />    
      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} />}
    </>
  );
};
export default Home;