import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/About.css'; 

const About = () => {
  const techStack = [
    "Python",
    "Javascript ES6+",
    "React.js",
    "Three.js",
    "Pandas & PySpark",
    "HTML & CSS"
  ];

  return (
    <Box id="about" className="about-container">
      <Typography variant="body1" className="typography-body1">
        I'm a software developer based in Hamburg. I have great interest in data analysis, full-stack 
        development, artificial intelligence, computer vision, and everything in between.
      </Typography>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Here are some technologies I work with:
      </Typography>

      <Box component="ul" className="tech-stack">
        {techStack.map((tech, index) => (
          <Typography component="li" key={index} className="tech-item">
            {tech}
          </Typography>
        ))}
      </Box>
      <Typography variant="h6" style={{ marginTop: '0px' }}>
        Outside of work I'm interested in games, anime, and football.
      </Typography>
    </Box>
  );
};

export default About;
