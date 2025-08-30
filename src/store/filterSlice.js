// features/filters/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: "",
  sortOption: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.categoryId = action.payload.categoryId;
      state.sortOption = action.payload.sortOption;
    },
    resetFilters: (state) => {
      state.categoryId = "";
      state.sortOption = "";
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
