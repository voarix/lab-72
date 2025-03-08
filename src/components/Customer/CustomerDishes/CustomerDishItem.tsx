import React from "react";
import { Dish } from "../../../types";
import { useAppDispatch } from "../../../app/hooks.ts";
import { addDish } from "../../../store/cart/cartSlice.ts";

interface Props {
  dish: Dish;
}

const CustomerDishItem: React.FC<Props> = ({ dish }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="card mt-4 p-2 shadow btn"
      key={dish.id}
      onClick={() => dispatch(addDish(dish))}
    >
      <div className="row">
        <div className="col-4">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="card-img-top rounded"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </div>
        <div className="col-8 p-3 d-flex align-items-center justify-content-between">
          <h4 className="card-title fw-bolder mb-0" style={{ maxWidth: "63%" }}>
            {dish.name}
          </h4>
          <span className="fw-bold text-nowrap">{dish.price} KGS</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDishItem;
