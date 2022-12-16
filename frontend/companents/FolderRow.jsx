import { Grid } from "@mui/material";
import FolderItem from "./FolderItem";

const FolderRow = ({content}) => {

    return(
      <Grid container>
        {content.map((item, index ) => <FolderItem key={index} content={item}/>)}
      </Grid>
    )
}

export default FolderRow;