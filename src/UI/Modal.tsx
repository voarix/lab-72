import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { clearCart, deleteDish, selectCartDishes } from "../store/cart/cartSlice.ts";
import BackDrop from "./BackDrop.tsx";
import { Order } from "../types";
import { createOrder } from "../store/orders/ordersThunks.ts";
import { selectCreateLoading } from "../store/orders/ordersSlice.ts";
import ButtonSpinner from "./Spinner/ButtonSpinner/ButtonSpinner.tsx";

interface Props extends React.PropsWithChildren {
  show?: boolean;
  title?: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  show = false,
  title = "Confirm your order",
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const createLoading = useAppSelector(selectCreateLoading);

  const onDeleteCartDish = (dishId: string) => {
    dispatch(deleteDish(dishId));
  };

  const onOrder = async () => {
    const order: Order = {};

    for (const cartDish of cartDishes) {
      order[cartDish.dish.id] = cartDish.amount;
    }

    await dispatch(createOrder(order));
    dispatch(clearCart());
    onClose();
  };

  return (
    <>
      <BackDrop show={show} onClickBackDrop={onClose}/>
      <div
        className="modal show"
        style={{
          display: show ? "block" : "none",
          position: "fixed",
          width: "500px",
          maxHeight: "80vh",
          overflow: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            <div className="p-3">
              {cartDishes.map((cartDish) => (
                  <div key={cartDish.dish.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{cartDish.dish.name}</h4>
                      <p>Amount: {cartDish.amount}</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteCartDish(cartDish.dish.id)}
                      disabled={createLoading}
                    >
                      {createLoading ? <ButtonSpinner /> : "Delete"}
                    </button>
                  </div>
                )
              )}
            </div>
            <div className="modal-footer">
              {cartDishes.length > 0 && (
                <button
                  className="btn btn-success"
                  onClick={onOrder}
                  disabled={createLoading}
                >
                  {createLoading ? <ButtonSpinner /> : "Order"}
                </button>
              )}
              <button className="btn btn-danger" onClick={onClose} disabled={createLoading}>
                {createLoading ? <ButtonSpinner /> : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
