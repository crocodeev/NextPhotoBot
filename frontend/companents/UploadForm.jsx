import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import UploadFormItem from './UploadFormItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, choose } from '../store/slice';


const UploadForm = () => {

    const choice = useSelector((state) => state.folders.choosen);
    const dispatch = useDispatch();
    const [files, addFiles] = useState([]);

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

    const handleAddFile = (event) => {
        console.log(files);
        const file = event.target.files[0];
        console.log(file);
        addFiles( files => [...files, file]);
    }

    const handleUpload = () => {

        const folderName = choice;
    
        const formdata = new FormData();
      
        files.forEach(item => {
            formdata.append(item.name, item)
        })
    
        formdata.append("folder", folderName);
        formdata.append("user", JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user));
    
        const requestOptions = {
          method: 'POST',
          body: formdata,
        };
    
        const url = window.location.protocol + "//" + window.location.host + "/nc/file";
    
        dispatch(toggleModal());
    
          fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => {
            dispatch(toggleModal());
            dispatch(choose(null));
            tgPop(result);
          })
          .catch(error => {
            dispatch(toggleModal());
            dispatch(choose(null));
            console.log('error', error)});
        
      }

    if(!Boolean(choice)){
        return null;
    }

    return(
        <div>
        <Box sx={{ width: '100%', bgcolor: 'primary.light'}}>
        {files.map((item, index) => <UploadFormItem name={item.name} key={index}/>)}    
        <IconButton
          onChange={handleAddFile}   
          color="secondary" 
          aria-label="upload picture" 
          component="label"
          edge="end"
          sx={{ width: '100%' }}>
            <Typography align="justify" variant="subtitle1" color='text.primary' component="div" sx={{ flexGrow: 1 }}>
            ...
            </Typography>
            <input 
            hidden accept="image/*" 
            type="file" 
             />
            <AddAPhotoIcon />
          </IconButton>
          </Box>

          <Box sx={{ width: '100%', bgcolor: 'info.light'}}>
          <IconButton 
          sx={{ bgcolor: 'info.light', width: '100%'}}
          aria-label="upload picture" 
          component="label"
          edge="end" 
          onClick={handleUpload}>
            <Typography align="justify" variant="h6" color='text.primary' component="div" sx={{ flexGrow: 1 }}>
            UPLOAD
            </Typography>
            <UploadFileIcon color="secondary" />
          </IconButton>
          </Box>
        
        </div>
    )
    
}

export default UploadForm;