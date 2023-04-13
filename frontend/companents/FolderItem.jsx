import { Grid } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { forward, choose, toggleModal, parentFolder } from '../store/slice';
import { getBaseName } from "../../backend/utils/utils";
import { tgPopUp } from "../telegram"
import Api from '../api';

const api = Api.getInstance()

const FolderItem = ({content}) => {

    const fullName = content;
    const choice = useSelector((state) => state.folders.choosen);
    const createBlock = useSelector((state) => state.folders.createBlock);
    const deepLevel = useSelector((state) => state.folders.folders).length;
    const dispatch = useDispatch();

    const getFolders = (fullName) => {
      
      dispatch(parentFolder(fullName));
      dispatch(toggleModal());

      const onResolve = (data) => {
              dispatch(toggleModal());
              dispatch(forward(data.folders))
      }

      const onReject = (error) => {
              dispatch(toggleModal());
              tgPopUp(error)
      }

      api.getFolders(fullName)
      .then(onResolve)
      .catch(onReject)
  }

    const baseName = getBaseName(content);

    const handleChange = (event) => {
      const result = event.target.checked ? fullName : null;
      dispatch(choose(result));
    }

    const checkBoxType = (choice, createBlock) => {

      // prevent to upload file at roots folders
      if(deepLevel < 3){
        return null
      }

      if(createBlock){
        return <Checkbox checked={false} disabled={true} />
      }

      if(choice === null){
        return <Checkbox checked={false} onChange={handleChange}/>
      }else if (choice === fullName){
        return <Checkbox checked={true} onChange={handleChange}/>
      }else{
        return <Checkbox checked={false} disabled={true} />
      }
    }

    const checkBox = checkBoxType(choice, createBlock);

    return(
      <Grid item xs={6}>
        {checkBox}
        <FolderIcon 
        sx={{ fontSize: 60}} color='info'
        onClick={() => {getFolders(fullName)}}/>
        <Typography align='left'
          variant="body1"
          gutterBottom
          color = "text.secondary"
          sx={{ whiteSpace: "break-spaces", lineBreak: "anywhere"}}>
        {baseName}
        </Typography>
      </Grid>  
    )
}

export default FolderItem;