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
          <div id="content">
            <Home />
            <Box component="section" className="band band-cream">
              <About />
            </Box>
            <Box component="section" className="band band-navy">
              <Experience />
            </Box>
            <Box component="section" className="band band-cream band-cream-top">
              <Projects />
            </Box>
            <Box component="section" className="band band-navy band-footer">
              <Credits />
            </Box>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
