import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    credentials: {},
  },
  reducers: {
    detail: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
});

export const { detail, erase } = detailSlice.actions;
export const detailData = (state) => state.detail;
export default detailSlice.reducer;
