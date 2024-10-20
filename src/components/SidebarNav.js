import React from 'react';
import { AppBar, Toolbar, Box, List, ListItem, ListItemText, IconButton, useTheme, useMediaQuery } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';

const TopNav = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  const colors = {
    icons: '#FF4545',
    text: '#FF4545',
    background: '#000000'
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

  // Hide navigation on mobile screens
  if (isMobileOrTablet) {
    return null;
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: colors.background, 
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it's always on top
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <List sx={{ display: 'flex' }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.href}
              sx={{ color: colors.text, padding: '0 10px' }}
            >
              <ListItemText primary={`/${item.text.toLowerCase()}`} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {renderIconButton(EmailIcon, 'mailto:okeahdavid@gmail.com', 'Email')}
          {renderIconButton(LinkedInIcon, 'https://www.linkedin.com/in/david-okeah', 'LinkedIn')}
          {renderIconButton(GithubIcon, 'https://github.com/OkeahDavid', 'GitHub')}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;