// eslint-disable-next-line import/named
import { createTheme, responsiveFontSizes, Theme } from '@mui/material';

let theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#151315',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#000',
      contrastText: '#FFF',
    },
    success: {
      main: '#191819',
      contrastText: '#A2A2A2',
    },
    info: {
      main: '#FFF',
      contrastText: '#002E36',
    },
    custom: {
      white: '#FFF',
      black: '#000',
      mercury: '#E4E4E4',
    },
    background: {
      default: '#151315',
    },
    text: {
      primary: '#FFF',
      secondary: '#A2A2A2',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h2: {
      fontSize: '40px',
      fontWeight: 500,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
      textTransform: 'none',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      lineHeight: '16px',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#E4E4E4',
          color: '#151315',
          padding: '16px',
          width: '100%',
          maxWidth: '330px',
        },
        tooltipPlacementTop: {
          backgroundColor: '#E4E4E4',
        },
        arrow: {
          color: '#E4E4E4',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
