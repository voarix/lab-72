import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDishes from "./Containers/Admin/AdminDishes.tsx";
import AdminLayout from "./Containers/Admin/AdminLayout.tsx";
import AdminNewDish from "./Containers/Admin/AdminNewDish.tsx";
import AdminEditDish from "./Containers/Admin/AdminEditDish.tsx";
import CustomerLayout from "./Containers/Customer/CustomerLayout.tsx";
import CustomerHome from "./Containers/Customer/CustomerHome.tsx";
import AdminOrders from "./Containers/Admin/AdminOrders.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dishes" element={<AdminDishes />} />
          <Route path="new-dish" element={<AdminNewDish />} />
          <Route path="edit/:idDish" element={<AdminEditDish />} />
          <Route path='orders' element={<AdminOrders/>}/>
        </Route>
        <Route path="/" element={<CustomerLayout />}>
          <Route index path="/" element={<CustomerHome />} />
        </Route>
        <Route path="*" element={<h1>Not page found</h1>} />
      </Routes>
    </>
  );
};

export default App;
