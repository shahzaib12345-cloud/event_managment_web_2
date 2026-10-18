import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventsFromApi } from '../../services/ticketmaster';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchEventsFromApi(filters);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  page: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.events;
        state.page = action.payload.page;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default eventsSlice.reducer;