import { Grid } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { forward, choose, toggleModal } from '../store/slice';
import { getBaseName } from "../../backend/utils/utils";
import { RemoveShoppingCartRounded } from "@mui/icons-material";

const FolderItem = ({content}) => {

    const fullName = content;
    const choice = useSelector((state) => state.folders.choosen);
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

    const getFolders = (fullName) => {
    
      dispatch(toggleModal());

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              initData: window.Telegram.WebApp.initData,
              user: window.Telegram.WebApp.initDataUnsafe.user,
              folder: fullName })
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
              const folders = obj.folders;

              dispatch(toggleModal());
              dispatch(forward(obj.folders))

          })
          .catch(error => {
            dispatch(toggleModal());
            tgPop(error);});
  
  }

    const baseName = getBaseName(content);

    const handleChange = (event) => {
      const result = event.target.checked ? fullName : null;
      dispatch(choose(result));
    }

    const checkBoxType = (choice) => {
      if(choice === null){
        return <Checkbox checked={false} onChange={handleChange}/>
      }else if (choice === fullName){
        return <Checkbox checked={true} onChange={handleChange}/>
      }else{
        return <Checkbox checked={false} disabled={true} />
      }
    }

    const checkBox = checkBoxType(choice);

    return(
      <Grid item xs={6}>
        {checkBox}
        <FolderIcon 
        sx={{ fontSize: 60}} color='info'
        onClick={() => {getFolders(fullName)}}/>
        <Typography align='left' variant="h6" gutterBottom>
        {baseName}
        </Typography>
      </Grid>  
    )
}

export default FolderItem;