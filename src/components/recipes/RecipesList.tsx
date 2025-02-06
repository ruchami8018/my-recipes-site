import { Box, CircularProgress, Container, Typography, Grid, Card, CardContent, Divider, CardActions, Button, Alert } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
// import AddRecipe from "./AddRecipe";
import RecipesStore from "../../store/RecipeStore";
import SingleRecipe from "./SingleRecipe";

const RecipesList: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSingleRecipe, setShowSingleRecipe] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  useEffect(() => {
      const fetchRecipes = async () => {
          try {
              await RecipesStore.getAllRecipes();
              setError(null);
          } catch (error: any) {
              console.error('Failed to fetch recipes', error);
              setError(error.message || 'שגיאה בטעינת מתכונים');
          } finally {
              setIsLoading(false);
          }
      };

      fetchRecipes();
  },RecipesStore.list);

  if (isLoading) {
      return (
          <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              height="100vh"
          >
              <CircularProgress />
          </Box>
      );
  }

  if (error) {
      return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
              <Alert severity="error">
                  {error}
              </Alert>
              <Box mt={2} display="flex" justifyContent="center">
                  {/* <AddRecipe /> */}
              </Box>
          </Container>
      );
  }

  return (
      <>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
              {/* <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom 
                  align="center"
              >
                  אתר המתכונים שלי
              </Typography> */}

              {RecipesStore.list.length === 0 ? (
                  <Box 
                      display="flex" 
                      flexDirection="column" 
                      alignItems="center" 
                      gap={2}
                  >
                      <Typography variant="h6" color="textSecondary">
                          אין מתכונים להצגה
                      </Typography>
                      {/* <AddRecipe /> */}
                  </Box>
              ) : (
                  <>
                      <Grid container spacing={3}>
                          {RecipesStore.list.map((recipe) => (
                              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                                  <Card 
                                      variant="outlined" 
                                      sx={{ 
                                          height: '100%', 
                                          display: 'flex', 
                                          flexDirection: 'column' 
                                      }}
                                  >
                                      <CardContent sx={{ flexGrow: 1 }}>
                                          <Typography 
                                              variant="h5" 
                                              component="div" 
                                              gutterBottom
                                          >
                                              {recipe.title}
                                          </Typography>
                                          <Typography 
                                              variant="body2" 
                                              color="text.secondary"
                                          >
                                              {recipe.description || 'אין תיאור'}
                                          </Typography>
                                      </CardContent>
                                      <Divider />
                                      <CardActions>
                                          <Button 
                                              onClick={() => {
                                                  setSelectedRecipeId(recipe.id.toString());
                                                  setShowSingleRecipe(true);
                                              }} 
                                              size="small" 
                                              color="primary"
                                          >
                                              צפייה במתכון
                                          </Button>
                                      </CardActions>
                                  </Card>
                              </Grid>
                          ))}
                      </Grid>
                      <Box 
                          display="flex" 
                          justifyContent="center" 
                          mt={4}
                      >
                          {/* <AddRecipe /> */}
                      </Box>
                  </>
              )}
          </Container>
          
          {showSingleRecipe && selectedRecipeId && (
              <SingleRecipe 
                  recipeId={selectedRecipeId} 
                  onClose={() => {
                      setShowSingleRecipe(false);
                      setSelectedRecipeId(null);
                  }} 
              />
          )}
      </>
  );
});

export default RecipesList;