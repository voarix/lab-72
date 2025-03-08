import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Order, OrdersState } from "../../types";

export const createOrder = createAsyncThunk<{ orderId: string; order: Order }, Order>(
  "orders/createOrder",
  async (order) => {
    const response = await axiosApi.post("orders.json", order);
    return { orderId: response.data.name, order };
  }
);

export const fetchOrders = createAsyncThunk<OrdersState, void>(
  "orders/fetchOrders",
  async () => {
    const response = await axiosApi.get("orders.json");
    return response.data || {};
  }
);

export const deleteOrder = createAsyncThunk<string, string>(
  "orders/deleteOrder",
  async (orderId) => {
    await axiosApi.delete(`/orders/${orderId}.json`);
    return orderId;
  }
);