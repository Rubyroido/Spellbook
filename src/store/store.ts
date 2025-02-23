import { configureStore } from "@reduxjs/toolkit";
import spellsReducer from './spellsSlice'
import filterSlice from "./filterSlice";
import selectedSpellSlice from "./selectedSpellSlice";

export const store = configureStore({
  reducer: {
    spells: spellsReducer,
    filter: filterSlice,
    selectedSpell: selectedSpellSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch