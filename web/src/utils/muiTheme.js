import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

  // props: {
  //   MuiTypography: {
  //     variantMapping: {
  //       h1: 'h2',
  //       h2: 'h2',
  //       h3: 'h2',
  //       h4: 'h2',
  //       h5: 'h2',
  //       h6: 'h2',
  //       subtitle1: 'h2',
  //       subtitle2: 'h2',
  //       body1: 'span',
  //       body2: 'span',
  //     },
  //   },
  // },

  typography: {
    useNextVariants: true,
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
    overline: {
      color: '#8BA93E',
      lineHeight:1
    },
    subtitle2: {
      textTransform: 'uppercase',
      textAlign:'left',
      color: '#8BA93E'
    },
    body2: {
      textAlign:'left',
      lineHeight: 1.5,
    },
    h6: {
      lineHeight: 1,
      textAlign:'left'
    }
  },

  palette: {
    primary: {
      // light: '#60b846',
      main: '#8BA93E',
      // dark: '#60b846',
      contrastText: '#fff'
    },
    secondary: {
        main: '#de6a57'
    }
  },
});


export default theme;