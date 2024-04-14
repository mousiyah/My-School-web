import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

interface UserState {
  role: string | null;
  loading: boolean;
  error: string | null;
}

export const fetchUserRole = createAsyncThunk('user/fetchUserRole', async () => {
    const role = await authApi.getUserRole();
    return role;
});

const initialState: UserState = {
  role: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(fetchUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user role';
      });
  },
});

export default userSlice.reducer;
