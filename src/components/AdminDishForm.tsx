import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {
  selectFetchOneDishLoading,
  selectOneDish,
} from "../store/dishes/dishesSlice.ts";
import { fetchOneDishById } from "../store/dishes/dishesThunks.ts";
import ButtonSpinner from "./UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";
import { Spinner } from "react-bootstrap";
import { DishForm } from "../types";

interface Props {
  onSubmitFormToAddDish: (newDish: DishForm) => void;
  idDish?: string;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialForm: DishForm = {
  name: "",
  imageUrl: "",
  price: 0,
};

const AdminDishForm: React.FC<Props> = ({
  onSubmitFormToAddDish,
  idDish,
  isEdit = false,
  isLoading = false,
}) => {
  const [form, setForm] = useState<DishForm>(initialForm);
  const dispatch = useAppDispatch();
  const oneDish = useAppSelector(selectOneDish);
  const fetchOneDishLoading = useAppSelector(selectFetchOneDishLoading);

  const fetchOneDish = useCallback(
    async (id?: string | undefined) => {
      if (id) {
        await dispatch(fetchOneDishById(id));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setForm(initialForm);

    if (!oneDish && idDish) {
      void fetchOneDish(idDish);
    } else if (oneDish && idDish) {
      setForm(oneDish);
    }
  }, [fetchOneDish, idDish, oneDish]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name.trim() && Number(form.price) !== 0) {
      if (!form.imageUrl.trim()) {
        onSubmitFormToAddDish({
          ...form,
          price: Number(form.price),
          imageUrl:
            "https://i.pinimg.com/236x/27/17/93/27179351d0360f06d946f133f33a38ab.jpg",
        });
      } else {
        onSubmitFormToAddDish({ ...form, price: Number(form.price) });
      }
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <>
      <div className="container mt-5">
        {fetchOneDishLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={onSubmit}>
            <h4>{isEdit ? "Edit" : "Add new"} dish</h4>
            <hr />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={form.name}
                disabled={isLoading}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="imageUrl">Image url</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="form-control"
                disabled={isLoading}
                value={form.imageUrl}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                min={0}
                id="price"
                name="price"
                className="form-control"
                value={form.price}
                disabled={isLoading}
                onChange={inputChangeHandler}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isLoading}
            >
              <span className="me-2">{isEdit ? "Edit" : "Add"}</span>
              {isLoading && <ButtonSpinner />}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminDishForm;
