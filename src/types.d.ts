export interface DishForm {
  imageUrl: string;
  name: string;
  price: number;
}

export interface DishApi {
  [id: string]: DishForm;
}

export interface Dish extends DishForm {
  id: string;
}

export interface UpdateDish {
  id: string;
  dish: DishForm;
}
