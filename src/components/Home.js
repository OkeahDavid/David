import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { TypingEffect } from './TypingEffect';
import '../styles/Home.css';

const Home = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, 1000); // 1000ms = 1 second, matching the animation duration
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  const handleImageClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  return (
    <Box id="home" className="home-container">
      <Typography variant="h1" className="typography-h1">
        Hi, I'm <span className="david-text"><TypingEffect text="David" /></span>
      </Typography>
      <img 
        src="/profile_picture.jpeg" 
        alt="David" // Changed this line
        className={`profile-image ${isSpinning ? 'spinning' : ''}`}
        onClick={handleImageClick}
      />
    </Box>
  );
};

export default Home;