import CartItem from "./CartItem/CartItem.tsx";
import { CartDish } from "../../../types";
import React from "react";

interface Props {
  cartDishes: CartDish[];
}

const CartDishes: React.FC<Props> = ({ cartDishes }) => {
  const total = cartDishes.reduce((acc, cartDish) => {
    return acc + cartDish.dish.price * cartDish.amount;
  }, 0);

  const deliveryPrice = 150;

  const finalPrice = total + deliveryPrice;

  return (
    <>
      {cartDishes.map((cartDish) => (
        <CartItem key={cartDish.dish.id} cartDish={cartDish} />
      ))}

      <hr />
      <div className="card border-0 p-2">
        <div className="row">
          <div className="col text-right">Delivery:</div>
          <div className="col-5 text-right">
            <strong>{deliveryPrice}</strong> KGS
          </div>
        </div>
      </div>

      <div className="card border-0 p-2">
        <div className="row">
          <div className="col text-right">Total:</div>
          <div className="col-5 text-right">
            <strong>{finalPrice} </strong>KGS
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDishes;
