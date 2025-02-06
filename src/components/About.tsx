import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { 
  Code as CodeIcon, 
  Storage as StorageIcon, 
  Security as SecurityIcon, 
  AccountCircle as AccountCircleIcon 
} from '@mui/icons-material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          אודות הפרויקט
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" paragraph>
            פרויקט זה הוא אפליקציית ניהול משתמשים ותכנים מתקדמת, הבנויה בטכנולוגיות React ו-TypeScript.
            המערכת מספקת חוויית משתמש מודרנית ומאובטחת עם יכולות התחברות, ניהול משתמשים ותוכן.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="secondary">טכנולוגיות מרכזיות</Typography>
            <List>
              <ListItem>
                <ListItemIcon><CodeIcon color="primary" /></ListItemIcon>
                <ListItemText primary="React 19 (Beta)" secondary="מסגרת עבודה מתקדמת" />
              </ListItem>
              <ListItem>
                <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                <ListItemText primary="TypeScript" secondary="פיתוח מאובטח וקריא" />
              </ListItem>
              <ListItem>
                <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Material-UI" secondary="עיצוב מודרני ואחיד" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="secondary">יכולות עיקריות</Typography>
            <List>
              <ListItem>
                <ListItemIcon><AccountCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="ניהול משתמשים" secondary="התחברות, הרשמה ועדכון פרופיל" />
              </ListItem>
              <ListItem>
                <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
                <ListItemText primary="אבטחת מידע" secondary="הצפנה ואימות משתמשים" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="subtitle2" color="textSecondary">
            © 2024 פרויקט ניהול משתמשים. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
