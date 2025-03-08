import CustomerDishItem from "./CustomerDishItem.tsx";
import { Dish } from "../../../types";
import React from "react";
import Spinner from "../../../UI/Spinner/Spinner.tsx";

interface Props {
  dishes: Dish[];
  dishesLoading: boolean;
}

const CustomerDishes: React.FC<Props> = ({ dishes, dishesLoading }) => {
  const dishContent = dishes.map((dish) => (
    <CustomerDishItem key={dish.id} dish={dish} />
  ));

  const content = dishesLoading ? <Spinner /> : dishContent;

  return <div className="col-6">{content}</div>;
};

export default CustomerDishes;
