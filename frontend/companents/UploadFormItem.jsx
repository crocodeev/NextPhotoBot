import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

const UploadFormItem = ({
    name
}) => {

    return(
    <IconButton
        color="secondary" 
        aria-label="upload picture" 
        component="label"
        edge="end"
        disabled
        sx={{ width: '100%' }}>
        <Typography align="justify" variant="subtitle1" color='text.primary' component="div" sx={{ flexGrow: 1 }}>
        {name}
        </Typography>
        <PhotoCameraIcon />
    </IconButton>
    )
    
}

export default UploadFormItem