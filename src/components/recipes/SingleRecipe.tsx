import { useEffect, useState } from "react";
import { RecipeType } from "../../models/Recipe";
import RecipesStore from '../../store/RecipeStore';
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Paper, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button
} from "@mui/material";
import { 
  Restaurant as RestaurantIcon, 
  ListAlt as ListAltIcon, 
  AccessTime as AccessTimeIcon 
} from '@mui/icons-material';
const SingleRecipe = ({ 
  recipeId, 
  onClose 
}: { 
  recipeId: string, 
  onClose: () => void 
}) => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDetails = await RecipesStore.getRecipeById(recipeId);
        setRecipe(recipeDetails);
      } catch (error) {
        console.error('Failed to load recipe details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (!recipe) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          לא ניתן לטעון את פרטי המתכון
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {recipe.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              <ListAltIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              רכיבים:
            </Typography>
            {Array.isArray(recipe.ingredients) && (
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                {recipe.instructions}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onClose}
          >
            CLOSE
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default SingleRecipe;