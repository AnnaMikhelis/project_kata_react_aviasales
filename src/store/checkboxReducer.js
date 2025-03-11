import { createSlice } from '@reduxjs/toolkit';

const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState: {
    Все: true,
    'Без пересадок': true,
    '1 пересадка': true,
    '2 пересадки': true,
    '3 пересадки': true,
  },
  reducers: {
    toggleCheckbox: (state, action) => {
      const { payload } = action;
      if (payload === 'Все') {
        const isChecked = !state['Все'];
        Object.keys(state).forEach((key) => (state[key] = isChecked));
      } else {
        state[payload] = !state[payload];

        if (state['Все']) {
          state['Все'] = false;
        }

        const allChecked = Object.keys(state).every(
          (key) => key === 'Все' || state[key]
        );
        if (allChecked) {
          state['Все'] = true;
        }
      }
    },
  },
});

export const { toggleCheckbox } = checkboxesSlice.actions;
export default checkboxesSlice.reducer;
