import { configureStore } from "@reduxjs/toolkit";
import { dishesReducer } from "../store/dishes/dishesSlice.ts";
import { cartReducer } from "../store/cart/cartSlice.ts";
import { ordersReducer } from "../store/orders/ordersSlice.ts";

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
