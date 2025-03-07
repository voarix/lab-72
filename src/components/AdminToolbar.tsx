import { NavLink } from "react-router-dom";

const AdminToolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink to='/admin' className="navbar-brand">Pizza Admin</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to='/admin/dishes' className="nav-link">Dishes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/admin/orders' className="nav-link">Orders</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminToolbar;