import { createSlice } from "@reduxjs/toolkit";

const quizProgressSlice = createSlice({
  name: "quizProgress",
  initialState: { progress: 0, completedQuizzes: [] },
  reducers: {
    incrementProgress: (state, { payload }) => {
      if (!state.completedQuizzes.includes(payload)) {
        state.completedQuizzes.push(payload);
        // eslint-disable-next-line no-param-reassign
        state.progress++;
      }
    },
  },
});

export const { incrementProgress } = quizProgressSlice.actions;

export default quizProgressSlice.reducer;
