import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import SidebarNav from './components/SidebarNav';
import Analytics from './components/Analytics';
import { Box } from "@mui/material";

import "./App.css";

// App.js
function App() {
  return (
    <Router>
      <Analytics />
      <ThemeProvider theme={theme}>
        <div className="App">
          <header>
            <SidebarNav />
          </header>
          <div id="content" style={{ 
            padding: '0 20px',
            marginTop: '56px',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden'
          }}>
            <Box component="section" sx={{ paddingTop: '10px', paddingBottom: '30px' }}>
              <Home />
            </Box>
            
            <Box component="section" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <About />
            </Box>
            
            <Box component="section" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Experience />
            </Box>
            
            <Box component="section" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Projects />
            </Box>
            
            <Box component="section" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Credits />
            </Box>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
