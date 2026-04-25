import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      shortName: "Sasol",
      title: "Software Engineer",
      company: "Sasol",
      duration: "January 2025 - Present",
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
      <Typography variant="h4" className="section-header title-header">
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
          <Typography variant="h5" className="experience-title">{experiences[selectedExpIndex].title}</Typography>
          <Typography variant="subtitle1" className="experience-company">@ {experiences[selectedExpIndex].company}</Typography>
          <Typography variant="subtitle2" className="experience-duration">{experiences[selectedExpIndex].duration}</Typography>
          <ul className="experience-responsibilities">
            {experiences[selectedExpIndex].responsibilities.map((item, idx) => (
              <li key={idx} className="experience-item">
                <span className="item-icon">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;