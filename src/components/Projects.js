import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '../styles/Projects.css';

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
    link: "https://lambent-arithmetic-f05abd.netlify.app/",
    preview: true,
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
  const [previewOpen, setPreviewOpen] = useState({});

  const togglePreview = (index) => {
    setPreviewOpen(prev => ({...prev, [index]: !prev[index]}));
  };

  return (
    <Box id="projects" className="projects-container">
      <Typography variant="h4" gutterBottom className="projects-header">
        / projects
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
              {project.preview && (
                <IconButton onClick={() => togglePreview(index)} className="project-link">
                  {previewOpen[index] ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          {project.preview && previewOpen[index] && (
            <Box className="preview-container">
              <iframe src={project.link} title="Project Preview" className="preview-iframe" />
              <IconButton 
                href={project.link} 
                target="_blank" 
                rel="noopener" 
                className="full-view-button"
              >
                <OpenInNewIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Projects;