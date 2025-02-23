import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISpell from "../interface/ISpell";
import { RootState } from "./store";

interface SavedSpellsState {
  spells: ISpell[];
}

const initialState: SavedSpellsState = {
  spells: JSON.parse(localStorage.getItem("spells") || "[]"),
};

export const spellsSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    saveSpell(state, action: PayloadAction<ISpell>) {
      if (!state.spells.some((spell) => spell.id === action.payload.id)) {
        state.spells = [...state.spells, action.payload];
        localStorage.setItem("spells", JSON.stringify(state.spells));
      }
    },
    deleteSpell(state, action: PayloadAction<number>) {
      state.spells = state.spells.filter((spell) => spell.id !== action.payload);
      localStorage.setItem("spells", JSON.stringify(state.spells));
    },
  },
});

export const selectSortedSpells = createSelector(
  (state: RootState) => state.spells.spells,
  (spells) => spells.filter((spell) => spell !== null).sort((a, b) => a.id - b.id)
);

export const { saveSpell, deleteSpell } = spellsSlice.actions;
export default spellsSlice.reducer;
