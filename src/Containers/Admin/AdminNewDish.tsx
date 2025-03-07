import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { clearOneDish, selectCreateDishLoading, } from "../../store/dishes/dishesSlice.ts";
import { createDish } from "../../store/dishes/dishesThunks.ts";
import AdminDishForm from "../../components/AdminDishForm.tsx";
import { DishForm } from "../../types";
import { useEffect } from "react";

const NewDish = () => {
  const navigate = useNavigate();
  const createDishLoading = useAppSelector(selectCreateDishLoading);
  const dispatch = useAppDispatch();

  const onCreateDish = async (newDish: DishForm) => {
    await dispatch(createDish(newDish));
    navigate("/admin/dishes");
  };

  useEffect(() => {
    dispatch(clearOneDish());
  }, [dispatch]);

  return (
    <>
      <AdminDishForm
        onSubmitFormToAddDish={onCreateDish}
        isLoading={createDishLoading}
      />
    </>
  );
};

export default NewDish;
