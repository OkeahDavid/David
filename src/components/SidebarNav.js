import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';

const SidebarNav = () => {
  const colors = {
    background: '#000000', // Updated to the correct color value for black
    icons: '#FF4545',
    text: '#FF4545'
  };

  const menuItems = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Experience', href: '#experience' },
    { text: 'Projects', href: '#projects' },
  ];

  const renderIconButton = (IconComponent, href, ariaLabel) => (
    <IconButton sx={{ color: colors.icons }} href={href} aria-label={ariaLabel}>
      <IconComponent />
    </IconButton>
  );

  return (
    <Box
      sx={{
        width: 200, // Adjusted width to give more space for the text
        position: 'fixed',
        bottom: 100,
        right: 0,
        bgcolor: colors.background,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // Align items to the right
        padding: 2,
      }}
    >
      <List sx={{ width: '100%' }}> 
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.text} 
            component="a" 
            href={item.href} 
            sx={{ color: colors.text, padding: 0, display: 'flex', justifyContent: 'flex-end' }} // Right-align the text
          >
            <ListItemText primary={`/${item.text.toLowerCase()}`} sx={{ textAlign: 'right', minWidth: 'fit-content' }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '0px' }}> 
        {renderIconButton(EmailIcon, 'mailto:okeahdavid@gmail.com', 'Email')}
        {renderIconButton(LinkedInIcon, 'https://www.linkedin.com/in/david-okeah', 'LinkedIn')}
        {renderIconButton(GithubIcon, 'https://github.com/OkeahDavid', 'GitHub')}
      </Box>
    </Box>
  );
};

export default SidebarNav;
