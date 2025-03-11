import { createSlice } from '@reduxjs/toolkit';
import { fetchTickets, fetchSearchId } from './ticketsActions';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    tickets: [],
    visibleTicketsCount: 5,
    status: 'idle',
    error: null,
    stop: false,
  },
  reducers: {
    showMoreTickets: (state) => {
      state.visibleTicketsCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.status = action.payload.stop ? 'completed' : 'idle';
        state.stop = action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { showMoreTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
