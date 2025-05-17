import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import XIcon from '@mui/icons-material/X';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import LaptopIcon from '@mui/icons-material/Laptop';
import FadeInSection from './FadeInSection';
import '../styles/Projects.css';

const projectData = [
  {
    title: "Metric Hub",
    description: [
      "A lightweight, privacy-focused analytics platform for tracking website statistics across multiple projects.",
    ],
    tech: ["Next.js", "Typescript", "Tailwind CSS"],
    github: "https://github.com/OkeahDavid/Metrics-hub",
    link: "https://metrics-hub.netlify.app/",
    image: "/project-images/metric-hub.png", // Default image that will be used if available
    category: "web",
  },
  {
    title: "Live Diaries",
    description: [
      "This is the landing page for the Live Diaries mobile app",
    ],
    tech: ["Next.js", "Typescript", "Tailwind CSS"],
    github: "https://github.com/OkeahDavid/LiveDiaries",
    link: "https://livediaries.netlify.app/",
    image: "/project-images/live-diaries.png",
    category: "web",
  },  
  {
    title: "BibleVerseTweets",
    description: [
      "A twitter bot that automatically posts a tweet containing a bible verse everyday. Feel free to give the page a follow",
    ],
    tech: ["Python", "Flask", "Google Cloud Platform (GCP)"],
    github: "https://github.com/OkeahDavid/BibleVerseTweets",
    link: "https://twitter.com/BibleBotTweets",
    image: "/project-images/bible-tweets.png",
    category: "automation",
  },
  {
    title: "Earth",
    description: [
      "A three.js simulation of the Earth and its moon",
    ],
    tech: ["Node.js", "Three.js", "HTML"],
    github: "https://github.com/OkeahDavid/Earth",
    link: "https://interactive-earth-3d.netlify.app/",
    preview: true,
    image: "/project-images/earth.png",
    category: "3D",
  },
  {
    title: "CIFAR-10 CNN Classifier",
    description: [
      "This project consists of the training of a CNN to classify images from the CIFAR-10 dataset",
    ],
    tech: ["Python", "Keras", "Tensorflow"],
    github: "https://github.com/OkeahDavid/CIFAR-10-CNN-Classifier",
    image: "/project-images/cifar10.png",
    category: "ai",
  },
  {
    title: "His Family Global Outreach Website",
    description: [
      "Creation of His Family Global Outreach Website",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/OkeahDavid/HFGO",
    link: "https://hfgo.netlify.app",
    image: "/project-images/hfgo.png",
    category: "web",
  },
  
  // More projects...
];

// Define categories with their display names and icons
const categories = [
  { id: "all", label: "All Projects", icon: <LaptopIcon /> },
  { id: "web", label: "Web Development", icon: <LanguageIcon /> },
  { id: "ai", label: "AI & Machine Learning", icon: <CodeIcon /> },
  { id: "3D", label: "3D Graphics", icon: <ImageIcon /> },
  { id: "automation", label: "Automation", icon: <CodeIcon /> }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imagesLoading, setImagesLoading] = useState({});

  const filteredProjects = activeCategory === "all" 
    ? projectData 
    : projectData.filter(project => project.category === activeCategory);

  // Track image loading status
  const handleImageLoad = (index) => {
    setImagesLoading(prev => ({...prev, [index]: false}));
  };

  useEffect(() => {
    // Initialize loading state for all projects
    const loadingStates = {};
    projectData.forEach((_, index) => {
      loadingStates[index] = true;
    });
    setImagesLoading(loadingStates);

    // Preload images
    projectData.forEach((project, index) => {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
        img.onload = () => handleImageLoad(index);
        img.onerror = () => handleImageLoad(index);
      } else {
        handleImageLoad(index);
      }
    });
  }, []);

  return (
    <Box id="projects" className="projects-container">
      <FadeInSection>
        <Typography variant="h4" gutterBottom className="projects-header">
          / projects
        </Typography>
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <Box className="project-filters">
          {categories.map((category) => (
            <Chip
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={() => setActiveCategory(category.id)}
              className={`category-chip ${activeCategory === category.id ? 'active' : ''}`}
            />
          ))}
        </Box>
      </FadeInSection>

      <Box className="projects-grid">
        {filteredProjects.map((project, index) => (
          <FadeInSection key={index} delay={100 * (index % 5)}>
            <Box 
              className={`project-card ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {project.image && (
                <Box 
                  className={`project-thumbnail ${imagesLoading[index] ? 'loading' : ''}`} 
                  style={{ 
                    backgroundImage: imagesLoading[index] ? 'none' : `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {imagesLoading[index] && (
                    <Box className="image-loading-placeholder" />
                  )}
                  {(!project.image || imagesLoading[index]) && (
                    <LaptopIcon className="fallback-icon" />
                  )}
                </Box>
              )}
              
              <Box className="project-header">
                <Typography variant="h6" className="project-title">{project.title}</Typography>
              </Box>
              
              {project.description && project.description.map((point, idx) => (
                <Typography key={idx} variant="body2" className="project-description">{point}</Typography>
              ))}
              
              <Box className="tech-stacks">
                {project.tech && project.tech.map((tech, idx) => (
                  <Box key={idx} className="tech-chip">{tech}</Box>
                ))}
              </Box>
              
              <Box className="project-actions">
                {project.github && (
                  <Button 
                    variant="outlined" 
                    size="small"
                    href={project.github} 
                    target="_blank" 
                    rel="noopener" 
                    startIcon={<GitHubIcon />}
                    className="action-button"
                    aria-label="View code"
                  >
                    Code
                  </Button>
                )}
                {project.link && (
                  <Button 
                    variant="contained" 
                    size="small"
                    href={project.link} 
                    target="_blank" 
                    rel="noopener" 
                    startIcon={project.link.includes('twitter.com') ? <XIcon /> : <LanguageIcon />}
                    className="action-button"
                    aria-label="View demo"
                  >
                    {project.link.includes('twitter.com') ? 'Twitter' : 'Demo'}
                  </Button>
                )}
              </Box>
            </Box>
          </FadeInSection>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
