import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteDishesLoading,
  selectDishes,
  selectFetchDishesLoading,
} from "../../store/dishes/dishesSlice.ts";
import { useEffect } from "react";
import { deleteDish, fetchDishes } from "../../store/dishes/dishesThunks.ts";
import AdminDishItem from "../../components/AdminDishItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useNavigate } from "react-router-dom";

const AdminDishes = () => {
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const dishesDeleteLoading = useAppSelector(selectDeleteDishesLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const onDeleteDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  const dishContent = dishes.map((dish) => (
    <AdminDishItem key={dish.id} dish={dish} onDeleteClick={() => onDeleteDish(dish.id)} deleteLoading={dishesDeleteLoading}/>
  ));

  const content = dishesLoading ? <Spinner /> : dishContent;

  return (
    <>
      <div className="mt-5 container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Dishes</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/new-dish")}
          >
            Add new Dish
          </button>
        </div>
        {content}
      </div>
    </>
  );
};

export default AdminDishes;
