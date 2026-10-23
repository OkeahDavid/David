import React from 'react';
import { Box, Typography } from '@mui/material';
import { TypingEffect } from './TypingEffect';
import '../styles/Home.css';

const Home = () => {
  return (
    <Box id="home" className="home-container container">
      <Box className="hero-text">
        <Typography className="eyebrow">&#9733; Welcome to Todayland &#9733;</Typography>
        <Typography variant="h1" className="typography-h1">
          Hi, I'm <span className="david-text"><TypingEffect text="David" /></span>
        </Typography>
        <Typography className="tagline">
          Software developer in Hamburg building full-stack apps, data pipelines and AI tools.
          <strong> Keep moving forward!</strong>
        </Typography>
        <Box className="hero-actions">
          <a href="#projects" className="btn-bubble">See my work</a>
          <a href="mailto:okeahdavid@gmail.com" className="btn-bubble chrome">Say hello</a>
        </Box>
      </Box>
      <Box className="hero-portrait">
        <span className="streak s1" /><span className="streak s2" /><span className="streak s3" />
        <span className="streak s4" /><span className="streak s5" /><span className="streak s6" />
        <Box className="portrait-ring">
          <img src="/profile_picture.jpg" alt="David" className="profile-image" />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
