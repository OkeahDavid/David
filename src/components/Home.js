import React from 'react';
import { Box, Typography } from '@mui/material';
import { TypingEffect } from './TypingEffect';
import '../styles/Home.css';

const Home = () => {
  return (
    <Box id="home" className="home-container">
      <Typography variant="h1" className="typography-h1">
        Hi, I'm <span className="david-text"><TypingEffect text="David" /></span>
      </Typography>
      <img 
        src="/profile_picture.jpeg" 
        alt="David"
        className="profile-image"
      />
    </Box>
  );
};

export default Home;