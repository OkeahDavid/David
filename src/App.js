import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import SidebarNav from './components/SidebarNav';

import "./App.css";

// App.js
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex' }}>
        <SidebarNav />
        <div id="content" style={{ flexGrow: 1, marginLeft: '60px' /* Adjust to the width of your new sidebar */ }}>
          <Home />
          <About />
          <Experience />
          <Projects />
          <Credits />
        </div>
      </div>
    </ThemeProvider>
  );
}


export default App;
