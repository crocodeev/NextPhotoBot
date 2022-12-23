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


  const handleBackClick = () => {
    if(level === 1){
      return;
    }
    dispatch(back())
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
            Sweet Memory
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}