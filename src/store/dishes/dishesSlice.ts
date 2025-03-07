import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createDish, deleteDish,
  fetchDishes,
  fetchOneDishById,
  updateDish,
} from "./dishesThunks.ts";
import { RootState } from "../../app/store.ts";
import { Dish, DishForm, UpdateDish } from "../../types";

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: DishForm | null;
  creatingLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  fetchOneLoading: false,
  oneDish: null,
  creatingLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) =>
  state.dishes.fetchLoading;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectUpdateDishLoading = (state: RootState) =>
  state.dishes.updateLoading;
export const selectCreateDishLoading = (state: RootState) =>
  state.dishes.creatingLoading;
export const selectFetchOneDishLoading = (state: RootState) =>
  state.dishes.fetchOneLoading;
export const selectDeleteDishesLoading = (state: RootState) => state.dishes.deleteLoading;


const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    clearOneDish: (state) => {
      state.oneDish = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: dishes }) => {
        state.items = dishes;
        state.fetchLoading = false;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneDishById.pending, (state) => {
        state.oneDish = null;
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneDishById.fulfilled, (state, { payload: dish }) => {
        state.oneDish = dish;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneDishById.rejected, (state) => {
        state.oneDish = null;
        state.fetchOneLoading = false;
      })

      .addCase(createDish.pending, (state) => {
        state.creatingLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.creatingLoading = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.creatingLoading = false;
      })

      .addCase(updateDish.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(
        updateDish.fulfilled,
        (state, action: PayloadAction<UpdateDish>) => {
          state.updateLoading = false;

          const index = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (index > -1) {
            state.items[index] = {
              ...action.payload.dish,
              id: action.payload.id,
            };
          }
        },
      )
      .addCase(updateDish.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteDish.pending, (state, {meta}) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const { clearOneDish } = dishesSlice.actions;
