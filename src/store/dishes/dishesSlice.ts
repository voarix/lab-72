import { createSlice } from "@reduxjs/toolkit";
import { fetchDishes } from "./dishesThunks.ts";
import { RootState } from "../../app/store.ts";

interface DishesState {
  items: Dish[],
  fetchLoading: boolean,
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
};

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
    })
      .addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
        state.items = dishes;
        state.fetchLoading = false;
    })
      .addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;