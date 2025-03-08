import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDishes,
  selectFetchDishesLoading,
} from "../../store/dishes/dishesSlice.ts";
import { useEffect } from "react";
import { fetchDishes } from "../../store/dishes/dishesThunks.ts";
import CustomerDishes from "../../components/Customer/CustomerDishes/CustomerDishes.tsx";
import Cart from "../../components/Customer/Cart/Cart.tsx";

const CustomerHome = () => {
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-between">
        <CustomerDishes dishes={dishes} dishesLoading={dishesLoading} />
        <Cart />
      </div>
    </div>
  );
};

export default CustomerHome;
