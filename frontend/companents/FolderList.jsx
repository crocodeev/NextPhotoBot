import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FolderRow from './FolderRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import CreateFolder from './CreateFolder';
import BackButton from './BackButton';



export default function FolderList() {

  const folders = useSelector((state) => state.folders.folders);
  const currentFoldersList = folders[folders.length - 1];

  if(!currentFoldersList.length && folders.length > 3){

    return( 
      <Container  maxWidth="sm" sx={{ bgcolor: 'info.light', height: '100%' }}>
        <Box sx={{ width: '100%', bgcolor: 'info.light'}}>
          <Typography variant="h5" color='secondary.main' component="div" sx={{ flexGrow: 1 }}>
              FOLDER DOESN'T CONTAIN SUBFOLDERS
          </Typography>
        </Box>
      

      <Grid container spacing={4}>
      <Grid item xs={6}>
        <CreateFolder />
        <Typography variant="h6" color='secondary.main' component="div" sx={{ flexGrow: 1 }}>
          create new
        </Typography>
      </Grid>
    
      <Grid container="true" item xs={6}>
        <BackButton />
        <Typography variant="h6" color='secondary.main' component="div" sx={{ flexGrow: 1 }}>
          turn back 
        </Typography>
      </Grid>

      </Grid>

      </Container>
    )

  }

  const createTwoDimesion = (currentFoldersList) => {
      
      return currentFoldersList.reduce((acc, item, index) => {

        if(index%2){
          acc[acc.length - 1].push(item)
        }else{
          acc.push([item])
        }
        return acc;
      }, [])
  };

  const twoDimension = createTwoDimesion(currentFoldersList);

  return (
    <Container  maxWidth="sm" sx={{ bgcolor: 'background.paper', 
    height: '90%', 
    position: 'fixed', 
    overflow: 'scroll' }}>
    <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
      {
        twoDimension.map((item,index) => {
          return <FolderRow key={index} content={item} />
        })
      }
    </Box>
    </Container>
  );

}