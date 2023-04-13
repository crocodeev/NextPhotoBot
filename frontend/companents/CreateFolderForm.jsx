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
import { tgPopUp } from '../telegram.ts'
import Api from '../api.ts'

const api = Api.getInstance()

const CreateFolderForm = () => {

    const parentFolder = useSelector((state) => state.folders.parentFolder).slice(-1);
    const createBlock = useSelector((state) => state.folders.createBlock);
    const [folderName, setFolderName] = useState('');
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
      setFolderName(event.target.value);
    }  

    const handleCancel = () => {
       setFolderName('');
       dispatch(toggleCreateBlock());
    }  

    const handleCreateFolder = () => {
    
        dispatch(toggleModal());

        const onResolve = (data) => {
            dispatch(toggleCreateBlock());
            tgPopUp(`${result.folder} успешно создана`);}

        //renew folder list
        const onContinue = (data) => {
            dispatch(back());
            dispatch(forward(data.folders));
            dispatch(toggleModal());}

        const onReject = (error) => {
            dispatch(toggleModal());
            console.log('error', error)}

        api.createFolder(parentFolder, folderName)
        .then(onResolve)
        .then(() => api.getFolders(parentFolder[0]))
        .then(onContinue)
        .catch(onReject)      

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