import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/utils/types';

const initialState: AuthState = {
  isAuthenticated: false,
  userName: null,
  tokenUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.userName = action.payload;
      localStorage.setItem('userNameToken', action.payload);
    },
    accessToken(state, action: PayloadAction<string>) {
      state.tokenUser = action.payload;
      localStorage.setItem('tokenUser', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userName = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout, accessToken } = authSlice.actions;
export default authSlice.reducer;
