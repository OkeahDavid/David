import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e5141a' },
    secondary: { main: '#7cc8ff' },
    error: { main: '#ff3b30' },
    background: { default: '#0f3aa8', paper: '#0a2a7a' },
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontFamily: '"Righteous", "Nunito", sans-serif', fontSize: '4rem' },
    h4: { fontFamily: '"Righteous", "Nunito", sans-serif' },
    h5: { fontFamily: '"Righteous", "Nunito", sans-serif' },
    h6: { fontFamily: '"Righteous", "Nunito", sans-serif' },
  },
});

export default theme;
