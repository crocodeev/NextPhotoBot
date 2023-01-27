import { createSlice } from '@reduxjs/toolkit'

const startFolders = ['/FotoObjects\ SPb', '/FotoObjects\ MSK'];

export const folderSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [startFolders],
    parentFolder: [],
    choosen: null,
    modal: false,
    createBlock:  false
  },
  reducers: {
    forward: (state, action) => {
      state.folders.push(action.payload);
      state.choosen = null;
    },
    back: (state) => {
      state.folders.pop();
      state.parentFolder.pop();
      state.choosen = null;
    },
    choose: (state, action) => {
      state.choosen = action.payload;
    },
    toggleModal: (state) => {
      state.modal = !state.modal;
    },
    toggleCreateBlock: (state) => {
      state.createBlock = !state.createBlock;
    },
    parentFolder: (state, action) => {
      state.parentFolder.push(action.payload);
    }
  }
})

// Action creators are generated for each case reducer function
export const { forward, back, choose, toggleModal, toggleCreateBlock, parentFolder } = folderSlice.actions

export default folderSlice.reducer