import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login
export const loginAsync = createAsyncThunk(
  'user/login',
  async (credentials) => {
    try {
      const response = await axios.post('/apis/users/login', credentials);
      return response.data; // Return data if login is successful
    } catch (error) {
      throw error; // Throw an error if login fails
    }
  }
);

// Logout
export const logoutAsync = createAsyncThunk('user/logout', async () => {
  try {
    const response = await axios.post('/apis/users/logout');
    return response.data; // Return data if logout is successful
  } catch (error) {
    throw error; // Throw an error if logout fails
  }
});

// is logged in
export const isLoggedInAsync = createAsyncThunk('user/auth', async () => {
  try {
    const response = await axios('/apis/users/auth');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    // You can define additional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // Here, you should return a new state object instead of modifying the existing one
        return { ...state, ...action.payload };
      })
      .addCase(logoutAsync.fulfilled, () => {
        // Return null to reset the user state when logged out
        return null;
      })
      .addCase(isLoggedInAsync.fulfilled, (state, action) => {
        console.log(123);
        // Return null to reset the user state when logged out
        return { ...state, ...action.payload };
      })
      .addCase(isLoggedInAsync.rejected, () => {
        // Return null to reset the user state when logged out
        return null;
      });
  },
});

// Export the synchronous actions
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
