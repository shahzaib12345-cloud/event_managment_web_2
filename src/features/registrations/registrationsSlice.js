import { createSlice } from '@reduxjs/toolkit';

const loadRegistrations = () => {
  try {
    return JSON.parse(localStorage.getItem('registrations')) || [];
  } catch {
    return [];
  }
};

const saveRegistrations = (list) => {
  localStorage.setItem('registrations', JSON.stringify(list));
};

const initialState = {
  items: loadRegistrations(), // registrations of ALL users, each has a userId
  message: null,
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const reg = action.payload;

      // stop duplicate registration
      const alreadyRegistered = state.items.find(
        (r) => r.userId === reg.userId && r.eventId === reg.eventId
      );
      if (alreadyRegistered) {
        state.message = { type: 'error', text: 'You are already registered for this event.' };
        return;
      }

      state.items.push(reg);
      saveRegistrations(state.items);
      state.message = { type: 'success', text: 'You have registered successfully!' };
    },

    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;
      state.items = state.items.filter(
        (r) => !(r.userId === userId && r.eventId === eventId)
      );
      saveRegistrations(state.items);
      state.message = { type: 'success', text: 'Your registration has been cancelled.' };
    },

    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { registerForEvent, cancelRegistration, clearMessage } = registrationsSlice.actions;
export default registrationsSlice.reducer;