import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { clearOneDish, selectUpdateDishLoading } from "../../store/dishes/dishesSlice.ts";
import { updateDish } from "../../store/dishes/dishesThunks.ts";
import { DishForm } from "../../types";
import AdminDishForm from "../../components/AdminDishForm.tsx";
import { useEffect } from "react";

const AdminEditDish = () => {
  const navigate = useNavigate();
  const updateLoading = useAppSelector(selectUpdateDishLoading);
  const { idDish } = useParams();
  const dispatch = useAppDispatch();

  const onEditDish = async (dishToUpdate: DishForm) => {
    if (idDish) {
      dispatch(updateDish({ id: idDish, dish: dishToUpdate }));
      navigate(`/admin/dishes`);
    }
  };

  useEffect(() => {
    dispatch(clearOneDish());
  }, [dispatch]);

  return (
    <>
      <AdminDishForm
        onSubmitFormToAddDish={onEditDish}
        idDish={idDish}
        isEdit
        isLoading={updateLoading}
      />
    </>
  );
};

export default AdminEditDish;
