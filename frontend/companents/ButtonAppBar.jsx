import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import { back, toggleModal } from '../store/slice';

export default function ButtonAppBar() {

  const level = useSelector((state) => state.folders.folders).length;
  const choice = useSelector((state) => state.folders.choosen);
  const dispatch = useDispatch();

  const tgPop = (message) => {
    //for test purpose
    if (window.Telegram.WebApp.initData === '') {
      console.log("NO TG");
      console.log(message);
      return;
    }

    const params = {
      message: message
    }

    window.Telegram.WebApp.showPopup(params);
  } 

  const handleBackClick = () => {
    if(level === 1){
      return;
    }
    dispatch(back())
  }

  const handleUploadClick = (event) => {

    const folderName = choice;
    console.log(folderName);

    const files = event.target.files;

    const formdata = new FormData();
    console.log(files);
    console.log(typeof files);

    for (let key in files){
      formdata.append(files[key].name, files[key])
    }

    formdata.append("folder", folderName);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const url = window.location.protocol + "//" + window.location.host + "/api/file";

    dispatch(toggleModal());

      fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        dispatch(toggleModal());
        tgPop(result);
      })
      .catch(error => {
        dispatch(toggleModal());
        console.log('error', error)});
    
  } 

  const iconButtonProps = {
    color: "secondary",
    "aria-label": "menu",
    sx:{ mr: 2 }
  }

  if(level <= 1){
    iconButtonProps.disabled = true;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>

          <IconButton edge="start" 
          onClick={handleBackClick}
          onInput={() => tgPop('input')}
          {...iconButtonProps}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" color='text.primary' component="div" sx={{ flexGrow: 1 }}>
            Sweet Memories
          </Typography>
          <IconButton color="secondary" 
          aria-label="upload picture" 
          component="label"
          disabled={!Boolean(choice)}
          >
            <input 
            hidden accept="image/*" 
            multiple type="file" 
            onChange={handleUploadClick} />
            <UploadFileIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}