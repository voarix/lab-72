import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Dish, DishApi, DishForm, UpdateDish } from "../../types";

export const fetchDishes = createAsyncThunk<Dish[], void>(
  "dishes/fetchDishes",
  async () => {
    const response = await axiosApi<DishApi | null>("dishes.json");
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
  },
);

export const fetchOneDishById = createAsyncThunk<DishForm, string>(
  "dishes/fetchOneDishById",
  async (dish_id) => {
    const response = await axiosApi<DishForm | null>(`dishes/${dish_id}.json`);
    const dish = response.data;

    if (!dish) {
      throw new Error("Not found");
    }
    return dish;
  },
);

export const createDish = createAsyncThunk<void, DishForm>(
  "dishes/createDish",
  async (dishToCreate) => {
    await axiosApi.post(`dishes.json`, dishToCreate);
  },
);

export const updateDish = createAsyncThunk<UpdateDish, UpdateDish>(
  "dishes/updateDish",
  async ({ id, dish }) => {
    await axiosApi.put(`dishes/${id}.json`, dish);
    return { id, dish };
  },
);
