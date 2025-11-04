"use client"


import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  favorites: number[],
  showFav: boolean,
}
const initialState:InitialStateType = {
  favorites: [],
  showFav: false,
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites(state, action) {
        const favBook = action.payload;
        if(!state.favorites.includes(favBook)){
            state.favorites.push(favBook);
        }
    },
    removeFavorites(state, action) {
        const favBook = action.payload;
        state.favorites = state.favorites.filter(favorites => favorites !== favBook);
    },
    setShowFavorites(state, action) {
      state.showFav = action.payload;
    }
  },
  
})


export const { addFavorites, removeFavorites, setShowFavorites  } = favoritesSlice.actions

export default favoritesSlice.reducer