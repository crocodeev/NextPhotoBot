import FolderList from "./companents/FolderList";
import Spinner from "./companents/Spinner";
import ButtonAppBar from "./companents/ButtonAppBar";
import UploadForm from "./companents/UploadForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow, blue, red } from '@mui/material/colors';
import CreateFolderForm from "./companents/CreateFolderForm";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: "#FFFFFF",
      contrastText:"#000000",
      darker: '#053e85'
    },
    info: {
      main: yellow[300],
      light: blue[300]
    },
    text:{
      primary: "#FFFFFF"
    },
    cancel:{
      main: red[300]
    },
    black:{
      main: "#000000"
    }
  }
});

const App = () => {

    return(
      <ThemeProvider theme={theme}>
        <Spinner />
        <ButtonAppBar />
        <CreateFolderForm />
        <UploadForm />
        <FolderList/>
      </ThemeProvider>
    );
}

export default App;
