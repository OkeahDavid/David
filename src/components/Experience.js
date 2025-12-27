import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faCar,faFlask  } from '@fortawesome/free-solid-svg-icons';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      shortName: "Sasol",
      title: "Software Engineer",
      company: "Sasol",
      duration: "January 2025 - Present",
      icon: faFlask ,
      responsibilities: [
        "Built and optimized full-stack applications using React.js and Django frameworks",
        "Developed full-stack GenAI applications with Azure OpenAI integration, implementing agentic workflows using AutoGen for multi-agent task coordination",
        "Deployed and maintained applications using Docker and Azure Cloud infrastructure",
      ],
    },
    {
      shortName: "Airbus",
      title: "Software Engineer",
      company: "Airbus",
      duration: "March 2024 - November 2024",
      icon: faPlane,
      responsibilities: [
        "Developed React.js front-end applications for cabin electronics control systems, improving user interface",
        "Built back-end solutions and REST APIs with C# and .NET framework, enhancing data processing for cabin electronic components",
        "Managed product ownership tasks, including backlog organization and coordination between stakeholders and development team",
      ],
    },
    {
      shortName: "Intenta",
      title: "Software Engineer",
      company: "Intenta Holding GmbH",
      duration: "January 2023 - December 2023",
      icon: faCar,
      responsibilities: [
        "Developed and maintained data analysis pipelines using Python, Pandas and PySpark",
        "Executed the design, implementation, and processing of software modules used in the field of autonomous driving",
        "Created and maintained comprehensive documentation for scripts, generating reports and KPIS that assisted in task management and aiding overall communication."
      ],
    },
    /*
    {
      shortName: "Orbus",
      title: "Data Analyst",
      company: "Orbus Health Marketing and Global",
      duration: "September 2020 - September 2021",
      icon: faHome,
      responsibilities: [
        "Utilized advanced database tools and techniques to streamline data processes",
        "Conducted comprehensive statistical analysis on customer data",
        "Analyzed customer data leading to a marketing strategy that increased customer engagement and sales by 20%."
      ],
    },*/
  ];

  const [selectedExpIndex, setSelectedExpIndex] = useState(0);

  const handleExperienceSelect = (index) => {
    setSelectedExpIndex(index);
  };

  return (
    <Box id="experience">
      <Typography variant="h4" className="title-header">
        / experience
      </Typography>

      <Box className="experience-container">
        <Box className="experience-selector">
          {experiences.map((exp, index) => (
            <Typography 
              key={index} 
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
                <FontAwesomeIcon icon={experiences[selectedExpIndex].icon} className="item-icon" />
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;