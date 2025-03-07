import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

export const fetchDishes = createAsyncThunk<Dish[], void>(
  'dishes/fetchDishes',
  async () => {
    const response = await axiosApi<DishApi | null>('dishes.json');
    const dishesListObject = response.data;

    if (!dishesListObject) {
      return [];
    } else {
      return Object.keys(dishesListObject).map((dishId) => {
        const dish = dishesListObject[dishId];
        return {
          ...dish,
          id: dishId,
        };
      });
    }
  }
);