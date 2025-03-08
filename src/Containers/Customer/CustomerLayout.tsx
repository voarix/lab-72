import { Outlet } from "react-router-dom";
import CustomerToolbar from "../../components/Customer/CustomerToolbar.tsx";

const CustomerLayout = () => {
  return (
    <>
      <CustomerToolbar />
      <Outlet />
    </>
  );
};

export default CustomerLayout;
