import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDishes from "./Containers/Admin/AdminDishes/AdminDishes.tsx";
import AdminLayout from "./Containers/Admin/AdminLayout.tsx";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path='dishes' element={<AdminDishes/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
