import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#e8372c' },
    secondary: { main: '#2b6fe0' },
    background: { default: '#f8f0dc', paper: '#fffaf0' },
    text: { primary: '#0a2463' },
  },
  typography: {
    fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 800 },
  },
});

export default theme;
