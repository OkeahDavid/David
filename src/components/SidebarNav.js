import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // import other icons you need
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import BrushIcon from '@mui/icons-material/Brush';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Github from '@mui/icons-material/GitHub';

const SidebarNav = () => {
  // Define your colors
  const colors = {
    darkBlack: '#1E1C1C',
    lightBlack: '#212121',
    red: '#FF4545'
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: colors.lightBlack,
        color: 'white'
      }}
    >
      <List>
        {['Home', 'About', 'Experience', 'Projects'].map((text, index) => (
          <ListItem button key={text} sx={{ bgcolor: colors.darkBlack }}>
            <ListItemIcon sx={{ color: colors.red }}>
              {index === 0 && <HomeIcon />}
              {index === 1 && <InfoIcon />}
              {index === 2 && <WorkIcon />}
              {index === 3 && <BrushIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: colors.darkBlack }}>
        <IconButton sx={{ color: colors.red }}>
          <EmailIcon />
        </IconButton>
        <IconButton sx={{ color: colors.red }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{ color: colors.red }}>
          <Github />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SidebarNav;
