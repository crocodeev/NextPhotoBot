import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { back } from '../store/slice';

export default function BackButton(params) {

    const level = useSelector((state) => state.folders.folders).length;
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
        sx:{ mr: 4 }
      }
    
      if(level <= 1){
        iconButtonProps.disabled = true;
      }
    
    return(
        <IconButton edge="end" 
          onClick={handleBackClick}
          {...iconButtonProps}>
            <ArrowBackIcon />
        </IconButton>
    )
}