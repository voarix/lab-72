import { useState } from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCartDishes } from "../../../store/cart/cartSlice.ts";
import CartDishes from "./CartDishes.tsx";
import Modal from "../../../UI/Modal.tsx";

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const cartDishes = useAppSelector(selectCartDishes);

  let cart = <p>No dishes in cart yet</p>;

  if (cartDishes.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes} />
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => setShowModal(!showModal)}
        >
          Checkout
        </button>
      </>
    );
  }

  return (
    <div className="col-5">
      <h4>Cart</h4>
      <hr />
      {cart}
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Cart;
