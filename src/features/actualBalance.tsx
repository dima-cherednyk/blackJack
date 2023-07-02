import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActualBalance = {
  actualBalance: number
};

const initialState: ActualBalance = {
  actualBalance: 100,
};

const actualBalanceSlice = createSlice({
  name: 'actaulBalance',
  initialState,
  reducers: {
    setActualBalance: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        actualBalance: action.payload,
      };
    },
  },
});

export default actualBalanceSlice.reducer;
export const { actions } = actualBalanceSlice;
