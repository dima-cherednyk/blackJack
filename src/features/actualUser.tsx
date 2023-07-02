import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type ActualUser = {
  actualUser: User | null,
};

const initialState: ActualUser = {
  actualUser: null,
};

const actualUserSlice = createSlice({
  name: 'actaulUser',
  initialState,
  reducers: {
    setActualUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        actualUser: action.payload,
      };
    },
  },
});

export default actualUserSlice.reducer;
export const { actions } = actualUserSlice;
