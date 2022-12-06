import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FolderRow from './FolderRow';
import { useSelector, useDispatch } from 'react-redux';




export default function FolderList() {

  const folders = useSelector((state) => state.folders.folders);
  const currentFoldersList = folders[folders.length - 1];

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
    <Container  maxWidth="sm" sx={{ bgcolor: 'background.paper', height: '100%' }}>
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