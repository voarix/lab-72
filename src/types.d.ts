interface DishForm {
  imageUrl: string;
  name: string;
  price: number;
}

interface DishApi {
  [id: string]: DishForm;
}

interface Dish extends DishForm {
  id: string;
}