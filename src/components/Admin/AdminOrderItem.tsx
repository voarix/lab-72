import React from "react";
import { Dish, Order } from "../../types";
import ButtonSpinner from "../../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";

interface Props {
  orderId: string;
  order: Order;
  onComplete: (orderId: string) => void;
  deletingLoading: boolean;
  dishes: Dish[];
}

const AdminOrderItem: React.FC<Props> = ({orderId, order, onComplete, dishes, deletingLoading}) => {
  let totalPrice = 0;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <ul className="list-group">
          {Object.keys(order).map((dishId) => {
            const amount = order[dishId];
            const dish = dishes.find((dishItem) => dishItem.id === dishId);

            const dishPrice = dish ? dish.price * amount : 0;
            totalPrice += dishPrice;

            return (
              <>
                <li key={dishId} className="row">
                  <p className='col'>{dish ? dish.name : "No found dish"}</p>
                  <p className='col text-center'>{dishPrice} KGS</p>
                  <p className='col text-end'>Amount: {amount}</p>
                </li>
                <hr/>
              </>
            );
          })}
        </ul>
        <p className='mt-3'>Delivery: 150 KGS</p>
        <p className='mt-3'>Total:<strong> {totalPrice + 150} KGS</strong></p>
        <button
          className="btn btn-danger mt-3"
          onClick={() => onComplete(orderId)}
          disabled={deletingLoading}
        > Complete Order
          {deletingLoading && <ButtonSpinner/>}
        </button>
      </div>
    </div>
  );
};

export default AdminOrderItem;