import React from "react";
import { Link } from "react-router-dom";

interface Props {
  dish: Dish;
}

const AdminDishItem: React.FC<Props> = ({dish}) => {
  return (
    <div className="card mb-4 p-2" key={dish.id}>
      <div className="row">
        <div className="col-4">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="card-img-top rounded"
            style={{
              maxHeight: "200px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-8 p-3 d-flex align-items-center justify-content-between">
          <h3 className="card-title fw-bold">{dish.name}</h3>
          <span className="card-text fw-bolder">{dish.price} KGS</span>
          <div>
            <Link to={`/admin/edit/${dish.id}`} className="btn btn-secondary me-2">
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