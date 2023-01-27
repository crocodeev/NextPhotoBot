import { IconButton } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateBlock } from '../store/slice';

export default function CreateFolder() {

  const choice = useSelector((state) => state.folders.choosen);
  const dispatch = useDispatch();

  const handleBackClick = () => {

    dispatch(toggleCreateBlock());
  } 

  const iconButtonProps = {
    color: "secondary",
    "aria-label": "menu",
    sx:{ mr: 2 }
  }

  if(Boolean(choice)){
    return null;
  }

  return (
          <IconButton edge='end' 
          onClick={handleBackClick}
          {...iconButtonProps}>
            <CreateNewFolderIcon />
          </IconButton>
  );
}