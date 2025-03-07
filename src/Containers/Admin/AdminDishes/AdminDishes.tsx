import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectDishes, selectFetchDishesLoading } from "../../../store/dishes/dishesSlice.ts";
import { useEffect } from "react";
import { fetchDishes } from "../../../store/dishes/dishesThunks.ts";
import AdminDishItem from "../../../components/AdminDishItem.tsx";
import Spinner from "../../../components/UI/Spinner.tsx";

const AdminDishes = () => {
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const dishContent = (dishes.map((dish) => (<AdminDishItem key={dish.id} dish={dish} /> )));

  const content = (dishesLoading ? <Spinner /> : dishContent);

  return (
    <>
      <div className="mt-5 container">
        {content}
      </div>
    </>
  );
};

export default AdminDishes;