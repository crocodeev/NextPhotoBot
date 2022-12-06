import { configureStore } from "@reduxjs/toolkit";
import folderReducer from './slice';

export default configureStore({
    reducer: {
        folders: folderReducer
    },
  })
