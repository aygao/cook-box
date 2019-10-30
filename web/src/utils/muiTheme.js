import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#60b846',
      main: '#8BA93E',
      dark: '#46b864',
      contrastText: '#fff'
    },
    secondary: {
        main: '#de6a57'
    }
  },
});


export default theme;