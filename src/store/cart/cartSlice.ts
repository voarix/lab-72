import { CartDish, Dish } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";

interface CartState {
  cartDishes: CartDish[];
}

const initialState: CartState = {
  cartDishes: [],
};

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.findIndex((cartItem) => {
        return cartItem.dish.id === dish.id;
      });

      if (existingIndex !== -1) {
        state.cartDishes[existingIndex].amount++;
      } else {
        state.cartDishes.push({ dish, amount: 1 });
      }
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    deleteDish: (state, { payload: dishId }: PayloadAction<string>) => {
      const existingIndex = state.cartDishes.findIndex((cartItem) => {
        return cartItem.dish.id === dishId;
      });

      if (existingIndex !== -1) {
        if (state.cartDishes[existingIndex].amount > 1) {
          state.cartDishes[existingIndex].amount--;
        } else {
          state.cartDishes.splice(existingIndex, 1);
        }
      }
    }
}});

export const cartReducer = cartSlice.reducer;
export const { addDish, clearCart, deleteDish } = cartSlice.actions;
