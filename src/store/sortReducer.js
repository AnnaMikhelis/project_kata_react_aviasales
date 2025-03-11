import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: { sortType: 'самый дешевый' },
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = sortSlice.actions;
export default sortSlice.reducer;
