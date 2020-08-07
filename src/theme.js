import { createMuiTheme} from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography:{
        fontFamily:'-apple-system,system-ui,BlinkMacSystemFont,' +
        '"Segoe UI","Oswald","Helvetica Neue",Arial,sans-serif',
    },
  palette: {
    primary: {
      main: teal[500],
      light:teal[50]
    },
  },
});

export default theme
