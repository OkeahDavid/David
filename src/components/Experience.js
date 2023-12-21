import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer",
      company: "Intenta Holding GmbH",
      duration: "January 2023 - December 2023, Hamburg, Germany",
      responsibilities: [
        "Developed and maintained data analysis pipelines using Python, Pandas and PySpark...",
        "Executed the design, implementation, and processing of software modules...",
        // ... more responsibilities
      ],
    },
    {
      title: "Data Analyst",
      company: "Orbus Health Marketing and Global",
      duration: "September 2019 - September 2020, Kharkiv, Ukraine",
      responsibilities: [
        "Utilized advanced database tools and techniques to streamline data processes...",
        "Conducted comprehensive statistical analysis on customer data...",
        // ... more responsibilities
      ],
    },
    // ... more experiences
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>EXPERIENCE</Typography>
      {experiences.map((exp, index) => (
        <Box key={index}>
          <Typography variant="h6">{exp.title}</Typography>
          <Typography variant="subtitle1">{exp.company}</Typography>
          <Typography variant="subtitle2">{exp.duration}</Typography>
          <List>
            {exp.responsibilities.map((item, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
          {index < experiences.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default Experience;
