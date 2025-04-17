import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type USER = { id: string; name: string; email: string } | null;
type RESET_TOKEN = { resetToken: string, email: string } | null;

export interface AuthState {
  isAuthenticated: boolean;
  user: USER;
  forgotPassword: RESET_TOKEN;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  forgotPassword: {
    resetToken: '',
    email: '',
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<USER>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    forgotPassword(state, action: PayloadAction<RESET_TOKEN>) {
        state.forgotPassword = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, forgotPassword, logout } = authSlice.actions;
export default authSlice.reducer;
