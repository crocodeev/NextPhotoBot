import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const FileUpload = () => {

    //hardcode
    const folderName = '/Distrib/Test';
    const [file, captureFile] = useState(null);

    const handleCapture = (event) => { 
        console.log(event.target.files);
        const fileLink = event.target.files[0];
        console.log(fileLink);
        captureFile(fileLink);
    }

    const handleSubmit = () => {

      const folderName = '/Distrib/Test';

      const formdata = new FormData();
      formdata.append("sampleFile", file);
      formdata.append("folder", "/Distrib/Test");

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const url = window.location.protocol + "//" + window.location.host + "/api/file";

      fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button 
          variant="contained" 
          component="label">
            Upload
            <input 
            hidden accept="image/*" 
            multiple type="file" 
            onChange={handleCapture} />
          </Button>
          <IconButton color="primary" 
          aria-label="upload picture" 
          component="label"
          onClick={handleSubmit}>
            <PhotoCamera />
          </IconButton>
        </Stack>
      );

}

export default FileUpload;
