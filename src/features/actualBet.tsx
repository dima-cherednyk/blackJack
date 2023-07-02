import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActualBet = {
  actualBet: number
};

const initialState: ActualBet = {
  actualBet: 1,
};

const actualBetSlice = createSlice({
  name: 'actaulBet',
  initialState,
  reducers: {
    setActualBet: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        actualBet: action.payload,
      };
    },
  },
});

export default actualBetSlice.reducer;
export const { actions } = actualBetSlice;
