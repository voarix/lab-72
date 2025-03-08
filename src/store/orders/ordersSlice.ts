import { OrdersState } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createOrder, deleteOrder, fetchOrders } from "./ordersThunks.ts";
import { RootState } from "../../app/store.ts";

interface OrdersSlice {
  orders: OrdersState;
  createLoading: boolean;
  fetchLoading: boolean;
  deleteLoading: boolean;
}

const initialState: OrdersSlice = {
  orders: {},
  createLoading: false,
  fetchLoading: false,
  deleteLoading: false,
};

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCreateLoading = (state: RootState) => state.orders.createLoading;
export const selectFetchLoading = (state: RootState) => state.orders.fetchLoading;
export const selectDeleteLoading = (state: RootState) => state.orders.deleteLoading;

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, {payload}) => {
        state.createLoading = false;
        state.orders[payload.orderId] = payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.orders = payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, {payload: dishId}) => {
        state.deleteLoading = false;
        const newOrders: OrdersState = {};

        for (const key in state.orders) {
          if (key !== dishId) {
            newOrders[key] = state.orders[key];
          }
        }

        state.orders = newOrders;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;