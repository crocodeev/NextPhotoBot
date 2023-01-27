import { useState } from 'react';
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, toggleCreateBlock, forward, back } from '../store/slice';
import TextField from '@mui/material/TextField';


const CreateFolderForm = () => {

    const parentFolder = useSelector((state) => state.folders.parentFolder).slice(-1);
    const createBlock = useSelector((state) => state.folders.createBlock);
    const [folderName, setFolderName] = useState('');
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
    
    const handleChange = (event) => {
      setFolderName(event.target.value);
    }  

    const handleCancel = () => {
       setFolderName('');
       dispatch(toggleCreateBlock());
    }  

    const handleCreateFolder = () => {

        const withUnderscore = folderName.replace(" ", "_");
        const withFullPath = parentFolder + "/" + withUnderscore;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                initData: window.Telegram.WebApp.initData,
                user: window.Telegram.WebApp.initDataUnsafe.user,
                folder: withFullPath
            })
        };
    
        const url = window.location.protocol + "//" + window.location.host + "/nc/createfolder";
        
        dispatch(toggleModal());
    
          fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
            dispatch(toggleCreateBlock());
            tgPop(`${result.folder} успешно создана`);
          })
          .then(() => {
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  initData: window.Telegram.WebApp.initData,
                  user: window.Telegram.WebApp.initDataUnsafe.user,
                  folder: parentFolder[0] })
              };

            const url = window.location.protocol + "//" + window.location.host + "/nc/folders";
              
            fetch(url, requestOptions)
            .then(response => {
              if(response.status === 401){
                return Promise.reject("Your are not allowed to upload images");
              }
              return response.text();
            })
            .then(data => JSON.stringify(data))
            .then(data => {
    
                const obj = JSON.parse(JSON.parse(data))
    
                dispatch(back());
                dispatch(forward(obj.folders));
                dispatch(toggleModal());
    
            })

          })
          .catch(error => {
            dispatch(toggleModal());
            console.log('error', error)})
        
      }
 

    if(!createBlock){
        return null;
    }  

    return(
        <div>
        <Box
        component="form"
        noValidate
        autoComplete="off" 
        sx={{ width: '100%', bgcolor: 'secondary.main' }}>
              <TextField
              onChange={handleChange}
              id="filled-basic" 
              label="enter folder name here" 
              variant="filled"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                    "& input": {
                        color: "#000000"
                    }
                }
            }}
              />
        </Box>
        <Grid container spacing={2}>
        <Grid item xs={6}>
       
            <Button
                variant="contained"
                aria-label="cancel" 
                component="label"
                onClick={handleCancel}
                edge='end'
                endIcon={<CancelIcon color="secondary"/>}
                sx={{ display: 'flex', margin: '5%', bgcolor: 'cancel.main'}}
              >
                <Typography align="justify" variant="h6" color='text.primary' component="div">
                CANCEL 
                </Typography>
            </Button> 
          
        </Grid>
        <Grid item xs={6}>
          
            <Button
                variant="contained"
                aria-label="create new folder" 
                component="label"
                onClick={handleCreateFolder}
                endIcon={<CreateIcon color="secondary"/>}
                sx={{ display: 'flex', margin: '5%', bgcolor: 'info.light'}}
              >
                <Typography align="justify" variant="h6" color='text.primary' component="div">
                CREATE FOLDER
                </Typography>
              </Button>
          
        </Grid>
        </Grid>
        </div>
    )
    
}

export default CreateFolderForm;