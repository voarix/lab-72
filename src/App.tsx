import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDishes from "./Containers/Admin/AdminDishes.tsx";
import AdminLayout from "./Containers/Admin/AdminLayout.tsx";
import AdminNewDish from "./Containers/Admin/AdminNewDish.tsx";
import AdminEditDish from "./Containers/Admin/AdminEditDish.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dishes" element={<AdminDishes />} />
          <Route path="new-dish" element={<AdminNewDish />} />
          <Route path="edit/:idDish" element={<AdminEditDish />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
