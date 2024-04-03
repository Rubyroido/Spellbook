import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spells: JSON.parse(localStorage.getItem('saved-spells') || '[]')
}

export const spellsSlice = createSlice({
  name: 'spells',
  initialState,
  reducers: {
    saveSpell(state, action) {
      const newSpell = action.payload;
      if (!state.spells[newSpell.id]) {
        state.spells[newSpell.id] = newSpell;
        localStorage.setItem('saved-spells', JSON.stringify(state.spells))
      }
    },
    deleteSpell(state, action) {
      const spellToDelete = action.payload;
      if (state.spells[spellToDelete.id]) {
        state.spells[spellToDelete.id] = null;
        localStorage.setItem('saved-spells', JSON.stringify(state.spells))
      }
    }
  }
})

export const { saveSpell, deleteSpell } = spellsSlice.actions;

export default spellsSlice.reducer;