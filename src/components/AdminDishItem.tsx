import React from "react";
import { Link } from "react-router-dom";
import { Dish } from "../types";

interface Props {
  dish: Dish;
}

const AdminDishItem: React.FC<Props> = ({ dish }) => {
  return (
    <div className="card mt-4 p-2" key={dish.id}>
      <div className="row">
        <div className="col-4">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="card-img-top rounded"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </div>
        <div className="col-8 p-3 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h3
              className="card-title fw-bolder mb-0"
              style={{ maxWidth: "63%" }}
            >
              {dish.name}
            </h3>
            <span className="fw-bold text-nowrap">{dish.price} KGS</span>
          </div>
          <div className="mt-2">
            <Link
              to={`/admin/edit/${dish.id}`}
              className="btn btn-secondary me-2"
            >
              Edit
            </Link>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDishItem;
