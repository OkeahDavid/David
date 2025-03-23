import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Drawer,
  ListItemIcon
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';

const TopNav = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const colors = {
    icons: '#FF4545',
    text: '#FF4545',
    background: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
    activeText: '#FF4545',
    inactiveText: '#fff'
  };

  const menuItems = React.useMemo(() => [
    { text: 'Home', href: '#home', icon: <HomeIcon /> },
    { text: 'About', href: '#about', icon: <PersonIcon /> },
    { text: 'Experience', href: '#experience', icon: <WorkIcon /> },
    { text: 'Projects', href: '#projects', icon: <CodeIcon /> },
  ], []);

  // Handle smooth scrolling when clicking nav items
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      setMobileMenuOpen(false);
      
      // Get the height of the navbar to use as offset
      const navbarHeight = document.querySelector('header').offsetHeight;
      
      // Get the element's position relative to the viewport
      const elementPosition = targetElement.getBoundingClientRect().top;
      
      // Get the position relative to the top of the page
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Added 20px extra padding
      
      // Smooth scroll to the adjusted position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update active section
      setActiveSection(targetId);
    }
  };

  // Check which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for background transparency
      setScrolled(window.scrollY > 20);
      
      // Get sections and their positions
      const sections = menuItems.map(item => item.href.substring(1));
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
      
      // Get all section elements and their positions
      const sectionPositions = sections.map(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return { id: sectionId, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: sectionId,
          top: rect.top - navbarHeight,
          bottom: rect.bottom - navbarHeight,
          height: rect.height
        };
      });
      
      // Find the current section - consider a section active when its top is close to viewport top
      // or when we're scrolled within it
      let currentSectionId = 'home'; // Default to home
      
      // Sort sections by position from top to bottom
      const sortedSections = [...sectionPositions].sort((a, b) => a.top - b.top);
      
      // First check if any section is at perfect position (top at viewport top or just below)
      const perfectSection = sortedSections.find(section => 
        section.top <= 100 && section.top >= -50
      );
      
      if (perfectSection) {
        currentSectionId = perfectSection.id;
      } else {
        // Otherwise find the section we're currently scrolled within
        const currentScrollPos = window.scrollY;
        
        for (let i = 0; i < sortedSections.length; i++) {
          const currentSection = sortedSections[i];
          const nextSection = sortedSections[i + 1];
          
          // Calculate absolute positions (not relative to viewport)
          const sectionTopAbsolute = currentSection.top + window.scrollY;
          
          // If we're in the last section or between current and next section
          if (!nextSection || 
              (currentScrollPos >= sectionTopAbsolute - 100 && 
              (currentScrollPos < nextSection.top + window.scrollY - 100))) {
            currentSectionId = currentSection.id;
            break;
          }
        }
      }
      
      // Update active section if changed
      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct active section on page load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems, activeSection]);

  const renderIconButton = (IconComponent, href, ariaLabel) => (
    <IconButton 
      sx={{ 
        color: colors.icons,
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          backgroundColor: 'rgba(255, 69, 69, 0.1)'
        }
      }} 
      href={href} 
      aria-label={ariaLabel}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <IconComponent />
    </IconButton>
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: colors.background, 
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: 'blur(10px)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          top: 0,
          left: 0,
          right: 0,
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobileOrTablet ? (
            <>
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleMobileMenu}
                sx={{ color: colors.icons }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                {renderIconButton(EmailIcon, 'mailto:okeahdavid@gmail.com', 'Email')}
                {renderIconButton(LinkedInIcon, 'https://www.linkedin.com/in/david-okeah', 'LinkedIn')}
                {renderIconButton(GithubIcon, 'https://github.com/OkeahDavid', 'GitHub')}
              </Box>
            </>
          ) : (
            <>
              <List sx={{ display: 'flex' }}>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    component="a"
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    sx={{ 
                      padding: '0 15px',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: activeSection === item.href.substring(1) ? '100%' : '0%',
                        height: '3px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: colors.activeText,
                        transition: 'width 0.3s ease'
                      },
                      '&:hover::after': {
                        width: '100%'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={`/${item.text.toLowerCase()}`} 
                      sx={{ 
                        color: activeSection === item.href.substring(1) ? colors.activeText : colors.inactiveText,
                        transition: 'color 0.3s ease',
                        '& .MuiTypography-root': {
                          fontWeight: activeSection === item.href.substring(1) ? 500 : 400
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                {renderIconButton(EmailIcon, 'mailto:okeahdavid@gmail.com', 'Email')}
                {renderIconButton(LinkedInIcon, 'https://www.linkedin.com/in/david-okeah', 'LinkedIn')}
                {renderIconButton(GithubIcon, 'https://github.com/OkeahDavid', 'GitHub')}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={isMobileOrTablet && mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '75%',
            maxWidth: '300px',
            backgroundColor: '#111',
            color: '#fff',
            padding: '20px 0'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: colors.icons }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              sx={{
                borderLeft: activeSection === item.href.substring(1) ? `4px solid ${colors.activeText}` : '4px solid transparent',
                backgroundColor: activeSection === item.href.substring(1) ? 'rgba(255, 69, 69, 0.1)' : 'transparent',
                padding: '12px 24px',
                transition: 'background-color 0.2s ease, border-left 0.2s ease'
              }}
            >
              <ListItemIcon sx={{ 
                color: activeSection === item.href.substring(1) ? colors.activeText : colors.inactiveText,
                minWidth: '40px'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: activeSection === item.href.substring(1) ? colors.activeText : colors.inactiveText,
                  '& .MuiTypography-root': {
                    fontWeight: activeSection === item.href.substring(1) ? 500 : 400
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default TopNav;