import { OrdersState } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrders } from "./ordersThunks.ts";
import { RootState } from "../../app/store.ts";

interface OrdersSlice {
  orders: OrdersState;
  createLoading: boolean;
  fetchLoading: boolean;
}

const initialState: OrdersSlice = {
  orders: {},
  createLoading: false,
  fetchLoading: false,
};

export const selectOrders = (state: RootState) => state.orders;
export const selectCreateLoading = (state: RootState) => state.orders.createLoading;
export const selectFetchLoading = (state: RootState) => state.orders.fetchLoading;

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
      });
  },
});

export const ordersReducer = ordersSlice.reducer;