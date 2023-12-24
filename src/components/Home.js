import React from 'react';
import { Box, Typography } from '@mui/material';
import { TypingEffect } from './TypingEffect'; // Adjust the import path as necessary
import '../styles/Home.css';

const Home = () => {
  return (
    <Box id="home" className="home-container">
      <Typography variant="h1" className="typography-h1">
        Hi, I'm <span className="david-text"><TypingEffect text="David" /></span>
      </Typography>
      <Typography variant="h4" className="typography-h2">I make stuff</Typography>
    </Box>
  );
};

export default Home;
