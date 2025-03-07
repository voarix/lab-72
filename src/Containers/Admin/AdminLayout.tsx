import AdminToolbar from "../../components/AdminToolbar.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminToolbar/>
      <Outlet/>
    </>
  );
};

export default AdminLayout;