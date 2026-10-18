import { createSlice } from '@reduxjs/toolkit';

// helper functions to read from local storage safely
const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
};

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch {
    return [];
  }
};

const initialState = {
  user: getSavedUser(), // stays logged in after refresh
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const users = getUsers();

      const exists = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        state.error = 'An account with this email already exists';
        return;
      }

      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // we do not keep the password in the logged in user
      const sessionUser = { id: newUser.id, name, email };
      state.user = sessionUser;
      state.error = null;
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const users = getUsers();

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) {
        state.error = 'Invalid email or password';
        return;
      }

      const sessionUser = { id: found.id, name: found.name, email: found.email };
      state.user = sessionUser;
      state.error = null;
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    },

    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('currentUser');
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;