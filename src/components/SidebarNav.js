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
  useMediaQuery
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const TopNav = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const colors = {
    icons: '#ffffff',
    text: '#ffffff',
    background: scrolled
      ? 'linear-gradient(180deg, rgba(7, 30, 92, 0.96), rgba(12, 44, 130, 0.92))'
      : 'linear-gradient(180deg, rgba(7, 30, 92, 0.75), rgba(12, 44, 130, 0.55))',
    activeText: '#ffffff',
    inactiveText: '#eaf4ff'
  };

  const menuItems = React.useMemo(() => [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Experience', href: '#experience' },
    { text: 'Projects', href: '#projects' },
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
          backgroundColor: 'rgba(255, 255, 255, 0.18)'
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
          boxShadow: scrolled ? '0 6px 20px rgba(2, 12, 40, 0.45)' : 'none',
          borderBottom: '4px solid transparent',
          borderImage: 'linear-gradient(90deg, #7f8d9b, #ffffff, #c9d3dc, #ffffff, #7f8d9b) 1',
          backdropFilter: 'blur(10px)',
          zIndex: 1300,
          top: 0,
          left: 0,
          right: 0,
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <Toolbar sx={{ 
            justifyContent: 'space-between', 
            paddingLeft: { xs: '16px', md: 'max(24px, calc((100vw - 1100px) / 2 + 24px))' },
            paddingRight: { xs: '16px', md: 'max(24px, calc((100vw - 1100px) / 2 + 24px))' },
            minHeight: { xs: '56px' }
          }}>
          {isMobileOrTablet ? (
            <>
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleMobileMenu}
                sx={{ color: colors.icons }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Box component="a" href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="David home" sx={{ display: 'flex' }}>
                <img src="/logo.svg" alt="" width="36" height="36" />
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                {renderIconButton(EmailIcon, 'mailto:okeahdavid@gmail.com', 'Email')}
                {renderIconButton(LinkedInIcon, 'https://www.linkedin.com/in/david-okeah', 'LinkedIn')}
                {renderIconButton(GithubIcon, 'https://github.com/OkeahDavid', 'GitHub')}
              </Box>
            </>
          ) : (
            <>
              <Box component="a" href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="David home"
                sx={{ display: 'flex', mr: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(-8deg) scale(1.12)' } }}>
                <img src="/logo.svg" alt="" width="40" height="40" />
              </Box>
              <List sx={{ display: 'flex' }}>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    component="a"
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    sx={{
                      padding: '6px 20px',
                      margin: '0 4px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-display)',
                      background: activeSection === item.href.substring(1)
                        ? 'linear-gradient(180deg, #ff5a4d 0%, #e5141a 50%, #a80a12 100%)'
                        : 'transparent',
                      boxShadow: activeSection === item.href.substring(1)
                        ? '0 0 0 2px #dfe6ec, 0 4px 10px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255,255,255,0.5)'
                        : 'none',
                      transition: 'background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        background: activeSection === item.href.substring(1)
                          ? undefined
                          : 'rgba(255, 255, 255, 0.18)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: activeSection === item.href.substring(1) ? colors.activeText : colors.inactiveText,
                        '& .MuiTypography-root': {
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.05rem',
                          letterSpacing: '0.04em'
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

      {/* Mobile Full-Screen Overlay Menu */}
      {isMobileOrTablet && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(180deg, rgba(7, 30, 92, 0.97), rgba(15, 58, 168, 0.97))',
            zIndex: 1299,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            opacity: mobileMenuOpen ? 1 : 0,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {menuItems.map((item, index) => (
            <Box
              key={item.text}
              component="a"
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              sx={{
                textDecoration: 'none',
                color: activeSection === item.href.substring(1) ? colors.activeText : colors.inactiveText,
                fontSize: '2.2rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                padding: '12px 24px',
                borderRadius: '999px',
                background: activeSection === item.href.substring(1) ? 'linear-gradient(180deg, #ff5a4d, #e5141a 50%, #a80a12)' : 'transparent',
                transition: 'all 0.2s ease',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transitionDelay: mobileMenuOpen ? `${index * 0.08}s` : '0s',
                '&:hover': {
                  color: '#ffd54a',
                },
              }}
            >
              {item.text}
            </Box>
          ))}
        </Box>
      )}

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default TopNav;