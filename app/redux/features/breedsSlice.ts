"use client"

import { BREEDS_PATH, URL_API } from "@/app/consts"
import { DogsType } from "@/app/types/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  breeds: DogsType[],
  total: string,
  currentPage:string
}
const initialState:InitialStateType = {
  breeds: [],
  total:"",
  currentPage:"0"
}

export const fetchBreeds = createAsyncThunk('breeds/fetchBreeds', async () => { 
  const response = await fetch(`${URL_API}${BREEDS_PATH}`);
  if (!response.ok) {
    throw new Error('Error');
  }
  const data = await response.json();
  const totalBreeds = data.length;

  return {res: data, total: totalBreeds}
});



export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    removeBreed(state, action) {
      const prop = action.payload;
      state.breeds = state.breeds.filter(breed => breed.id !== prop);
      state.total = state.breeds.length.toString();
    },
    addBreed(state, action) {
      const lastId = state.breeds.length > 0 ? Math.max(...state.breeds.map(breed => breed.id)) : 1;
      const newBreed: DogsType = {
        id: lastId + 1,
        ...action.payload,
      };
      state.breeds.push(newBreed);
      state.total += 1;
    },
  },extraReducers: (builder) =>{
    builder.addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload.res;
        state.total = action.payload.total;
      });
  }
  
})

export const { removeBreed, addBreed } = breedsSlice.actions


export default breedsSlice.reducer
