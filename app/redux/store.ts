"use client"
import { configureStore } from '@reduxjs/toolkit'
import breedsReducer from './features/breedsSlice'
import favoritesReducer from './features/favoriteSlice'



export  const store = configureStore({
  reducer: {
    breeds:breedsReducer,
    favorites:favoritesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
