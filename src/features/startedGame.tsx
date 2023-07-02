import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StartedGame = {
  startedGame: boolean
};

const initialState: StartedGame = {
  startedGame: false,
};

const startedGameSlice = createSlice({
  name: 'startedGame',
  initialState,
  reducers: {
    setStartedGame: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        startedGame: action.payload,
      };
    },
  },
});

export default startedGameSlice.reducer;
export const { actions } = startedGameSlice;
