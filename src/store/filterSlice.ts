import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = number[];

const initialState: FilterState = [];

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleLevel(state, action: PayloadAction<number>) {
      const level = action.payload;
      if (state.includes(level)) {
        return state.filter((lvl) => lvl !== level); 
      } else {
        return [...state, level]; 
      }
    },
    clearFilter() {
      return [];
    },
  },
});

export const { toggleLevel, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
