import { NavLink } from "react-router-dom";

const CustomerToolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Turtle Pizza
        </NavLink>
      </div>
    </nav>
  );
};

export default CustomerToolbar;
