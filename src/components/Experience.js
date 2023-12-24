import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText} from '@mui/material';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      shortName: "Intenta", // Add short name
      title: "Software Developer",
      company: "Intenta Holding GmbH",
      duration: "January 2023 - December 2023",
      responsibilities: [
        "Developed and maintained data analysis pipelines using Python, Pandas and PySpark",
        "Executed the design, implementation, and processing of software modules used in the field of autonomous driving",
        "Created and maintained comprehensive documentation for scripts, generating reports and KPIS that assisted in task management and aiding overall communication."
        // ... more responsibilities
      ],
    },
    {
      shortName: "Orbus",
      title: "Data Analyst",
      company: "Orbus Health Marketing and Global",
      duration: "September 2020 - September 2021",
      responsibilities: [
        "Utilized advanced database tools and techniques to streamline data processes",
        "Conducted comprehensive statistical analysis on customer data",
        "Analyzed customer data leading to a marketing strategy that increased customer engagement and sales by 20%."
        // ... more responsibilities
      ],
    },
    // ... more experiences
  ];

  // State to track the selected experience
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);

  // Handler for setting the selected experience
  const handleExperienceSelect = (index) => {
    setSelectedExpIndex(index);
  };

  return (
    <>
      <Typography id="experience" variant="h4" className="title-header">
        / experience
      </Typography>

      <Box  className="experience-container">
        <Box className="experience-selector">
          {experiences.map((exp, index) => (
            <Typography key={index} 
                        className={`company-name ${index === selectedExpIndex ? 'active' : ''}`}
                        onClick={() => handleExperienceSelect(index)}
            >
              {exp.shortName}
            </Typography>
          ))}
        </Box>
        <Box className="experience-details">
          <Box className="experience-header">
            <Typography variant="h5" className="experience-title">{experiences[selectedExpIndex].title}</Typography>
            <Typography variant="subtitle1" className="experience-company">@ {experiences[selectedExpIndex].company}</Typography>
            <Typography variant="subtitle2" className="experience-duration">{experiences[selectedExpIndex].duration}</Typography>
          </Box>
          <List className="experience-responsibilities">
            {experiences[selectedExpIndex].responsibilities.map((item, idx) => (
              <ListItem key={idx} className="experience-item">
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Experience;