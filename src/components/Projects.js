import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import '../styles/Projects.css';
import TwitterIcon from '@mui/icons-material/Twitter';


const projectData = [
  {
    title: "His Family Global Outreach Website",
    description: [
      "Creation of His Family Global Outreach Website",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/OkeahDavid/HFGO",
    link: "https://familyglobaloutreach.org/",
  },
  {
    title: "BibleVerseTweets",
    description: [
      "A twitter bot that automatically posts a tweet containing a bible verse everyday. Feel free to give the page a follow",
    ],
    tech: ["Python", "Flask", "Google Cloud Platform (GCP)"],
    github: "https://github.com/OkeahDavid/BibleVerseTweets",
    link: "https://twitter.com/BibleBotTweets",
  },
  {
    title: "Earth",
    description: [
      "A three.js simulation of the Earth and its moon",
    ],
    tech: ["Node.js", "Three.js", "HTML"],
    github: "https://github.com/OkeahDavid/Earth",
  },
  {
    title: "CIFAR-10 CNN Classifier",
    description: [
      "This project consists of the training of a CNN to classify images from the CIFAR-10 dataset",
    ],
    tech: ["Python", "Keras", "Tensorflow"],
    github: "https://github.com/OkeahDavid/CIFAR-10-CNN-Classifier",
  },
  // More projects...
];

const Projects = () => {
  return (
    <Box className="projects-container">
      <Typography variant="h4" gutterBottom className="projects-header">
        PROJECTS
      </Typography>
      {projectData.map((project, index) => (
        <Box key={index} className="project-card">
          <Box className="project-header">
            <Typography variant="h6" className="project-title">{project.title}</Typography>
            <Box className="icons-container">
              {project.github && (
                <IconButton href={project.github} target="_blank" rel="noopener" className="project-link">
                  <GitHubIcon />
                </IconButton>
              )}
              {project.link && (
                <IconButton href={project.link} target="_blank" rel="noopener" className="project-link">
                  {project.link.includes('twitter.com') ? <TwitterIcon /> : <LanguageIcon />}
                </IconButton>
              )}
            </Box>
          </Box>
          {project.description && project.description.map((point, idx) => (
            <Typography key={idx} variant="body2" className="project-description">{point}</Typography>
          ))}
          <Box className="tech-stacks">
            {project.tech && project.tech.map((tech, idx) => (
              <Box key={idx} className="tech-chip">{tech}</Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Projects;