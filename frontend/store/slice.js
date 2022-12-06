import { createSlice } from '@reduxjs/toolkit'

export const folderSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [['/FotoObjects\ SPb', '/FotoObjects\ MSK']],
    choosen: null,
    modal: false
  },
  reducers: {
    forward: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.folders.push(action.payload);
      state.choosen = null;
    },
    back: (state) => {
      state.folders.pop();
      state.choosen = null;
    },
    choose: (state, action) => {
      state.choosen = action.payload;
    },
    toggleModal: (state) => {
      state.modal = !state.modal;
    }
  },
})

// Action creators are generated for each case reducer function
export const { forward, back, choose, toggleModal } = folderSlice.actions

export default folderSlice.reducer