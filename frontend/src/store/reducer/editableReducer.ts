import { createSlice } from '@reduxjs/toolkit';
const initialState: boolean = false

export const editableSlice = createSlice({
  name: 'editable',
  initialState,
  reducers: {
    setEditableTrue: (state:boolean) => true,
    setEditableFalse: (state:boolean) => false,
  }
})
export const {setEditableTrue, setEditableFalse } = editableSlice.actions
export default editableSlice.reducer
