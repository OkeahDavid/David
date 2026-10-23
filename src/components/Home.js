import React from 'react';
import { Box, Typography } from '@mui/material';
import { TypingEffect } from './TypingEffect';
import HeroArt from './HeroArt';
import '../styles/Home.css';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Home = () => {
  return (
    <Box id="home" className="hero">
      <HeroArt animate={!reducedMotion()} />
      <Box className="container hero-inner">
        <Typography className="eyebrow">Software developer &middot; Hamburg</Typography>
        <Typography variant="h1" className="typography-h1">
          Hi, I'm <span className="david-text"><TypingEffect text="David" /></span>
        </Typography>
        <Typography className="tagline">
          I build full-stack apps, data pipelines and AI tools. Always looking ahead, always{' '}
          <strong>moving forward.</strong>
        </Typography>
        <Box className="hero-actions">
          <a href="#projects" className="btn btn-light">See my work</a>
          <a href="mailto:okeahdavid@gmail.com" className="btn">Say hello</a>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
