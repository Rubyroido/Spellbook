import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISpell from "../interface/ISpell";

interface SelectedSpellState {
  selectedSpell: ISpell | null;
}

const initialState: SelectedSpellState = {
  selectedSpell: null
};

export const selectedSpellSlice = createSlice({
  name: "selectedSpell",
  initialState,
  reducers: {
    selectSpell(state, action: PayloadAction<ISpell>) {
      state.selectedSpell = action.payload;
    },
    clearSpell(state) {
      state.selectedSpell = null;
    },
  },
});

export const { selectSpell, clearSpell } = selectedSpellSlice.actions;
export default selectedSpellSlice.reducer;
