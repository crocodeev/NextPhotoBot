import FolderList from "./companents/FolderList";
import Spinner from "./companents/Spinner";
import ButtonAppBar from "./companents/ButtonAppBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#FFFFFF",
    },
    info: {
      main: yellow[300],
    },
    text:{
      primary: "#FFFFFF"
    }
  },
});

const App = () => {

    return(
      <ThemeProvider theme={theme}>
        <Spinner />
        <ButtonAppBar />
        <FolderList/>
      </ThemeProvider>
    );
}

export default App;
