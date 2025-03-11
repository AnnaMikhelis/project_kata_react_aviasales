import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk(
  'tickets/fetchSearchId',
  async () => {
    const response = await fetch(
      'https://aviasales-test-api.kata.academy/search'
    );
    if (!response.ok) {
      throw new Error(`Ошибка при получении searchId: ${response.status}`);
    }
    const data = await response.json();
    return data.searchId;
  }
);

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId) => {
    let tickets = [];
    let stop = false;

    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );

      if (!response.ok) {
        throw new Error(`Ошибка в получении билетов: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.tickets)) {
        tickets = data.tickets;
      } else {
        throw new Error('Ошибка формата данных');
      }

      stop = data.stop;
    } catch (error) {
      console.error('Ошибка получения', error);
      throw error;
    }

    return { tickets, stop };
  }
);
