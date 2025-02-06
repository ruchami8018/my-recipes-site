import { useContext } from "react";
import { Stack, Box } from "@mui/material";
import { UserContext } from "../../store/UserStore";
import { Avatar } from "@mui/material";
const gradients = [
  "linear-gradient(45deg, #009688, #4DB6AC, #80CBC4)",
  "linear-gradient(45deg, #00796B, #26A69A, #64B5F6)",
  "linear-gradient(45deg, #004D40, #009688, #4DB6AC)",
];
const ProfileAvatar = () => {
  const {currentUser}=useContext(UserContext)
  let f: string = ''
  if (currentUser) {
    f = currentUser?.firstName?.[0] || '';
      if(currentUser.lastName)
      f+=currentUser.lastName[0]
  }
return (
  <Stack direction="row" spacing={2}>
         <Box 
          position="absolute" 
          top={0} 
          left={0} 
          sx={{ padding: '16px' }} 
      >
          <Avatar 
            sx={{ 
              background: gradients[0],
              transition: '0.8s',
              '&:hover': {
                background: gradients[1]
              }
            }} 
          >
            {f}
          </Avatar>
      </Box>
    
  </Stack>
  );
};
  export default ProfileAvatar