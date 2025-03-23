import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/About.css'; 

const About = () => {
  const techStack = [
    "Javascript ES6+",
    "Typescript",
    "React.js + Vite",
    "Next.js",
    "Python",
    "Pandas & PySpark"
  ];

  return (
    <Box id="about" className="about-container">
      <Typography variant="h4" gutterBottom className="projects-header">
        / about
      </Typography>
      <Typography variant="body1" className="typography-body1">
        I'm a software developer based in Hamburg. I am greatly interested in data analysis, full-stack 
        development, artificial intelligence, computer vision, and everything in between.
      </Typography>

      <Typography variant="body1" className="typography-body1">
        Here are some technologies I work with:
      </Typography>

      <Box component="ul" className="tech-stack">
        {techStack.map((tech, index) => (
          <Typography component="li" key={index} className="tech-item">
            {tech}
          </Typography>
        ))}
      </Box>
      <Typography variant="body1" className="typography-body1">
        Outside of work I'm interested in games, anime, and football.
      </Typography>
    </Box>
  );
};

export default About;
