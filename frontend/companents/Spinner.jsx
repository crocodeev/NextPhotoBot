import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Spinner = () =>  {
  
   const openState = useSelector((state) => state.folders.modal);  

  return (
    <div>
      <Modal
        open={openState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    </div>
  );
}

export default Spinner