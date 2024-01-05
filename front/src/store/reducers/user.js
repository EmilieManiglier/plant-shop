import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
  return {
    token: null,
    firstname: '',
    lastname: '',
    role: '',
    isLoggedIn: false
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState() },
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: (state) => {
      Object.assign(state, initialState());
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
