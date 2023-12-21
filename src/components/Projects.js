import React from 'react';
import { Box, Typography, Link, Chip } from '@mui/material';

const projectData = [
  {
    title: "Bachelor’s Thesis – Computer Vision",
    date: "September 2021 - July 2022",
    description: [
      "Developed a Python application integrating OpenCV modules...",
      "Analyzed the interplay between execution time, image size...",
      // More bullet points...
    ],
    tech: ["Python", "OpenCV"],
    link: ""
  },
  {
    title: "His Family Global Outreach Website",
    date: "September 2021 – Present",
    description: [
      "Developed the His Family Global Outreach Website using HTML...",
      // More bullet points...
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://familyglobaloutreach.org/"
  },
  // More projects...
];

const Projects = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        PROJECTS
      </Typography>
      {projectData.map((project, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">{project.title}</Typography>
          <Typography variant="subtitle1">{project.date}</Typography>
          {project.description.map((point, idx) => (
            <Typography key={idx} variant="body2">{point}</Typography>
          ))}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 1 }}>
            {project.tech.map((tech, idx) => (
              <Chip key={idx} label={tech} variant="outlined" />
            ))}
          </Box>
          {project.link && (
            <Link href={project.link} target="_blank" rel="noopener">
              Visit project
            </Link>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
