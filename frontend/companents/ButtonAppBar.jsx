import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import CreateFolder from './CreateFolder';
import BackButton from './BackButton';


export default function ButtonAppBar() {

  const level = useSelector((state) => state.folders.folders).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>

          <BackButton />

          <Typography variant="h6" color='text.primary' component="div" sx={{ flexGrow: 1 }}>
            Sweet Memory
          </Typography>

          { level < 3 ? null : <CreateFolder /> }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}