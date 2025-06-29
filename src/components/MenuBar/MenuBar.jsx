import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import "./MenuBar.css";

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthData, auth } = useContext(AppContext);
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData(null, null);
    navigate("/login");
  };

  const isAdmin = auth.role === "ROLE_ADMIN";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <NavLink className="navbar-brand" to="/">
        <img src={assets.logo} alt="Logo" height="60" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                isActive("/dashboard") ? "active-link" : ""
              }`}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                isActive("/explore") ? "active-link" : ""
              }`}
              to="/explore"
            >
              Explore
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    isActive("/manage-items") ? "active-link" : ""
                  }`}
                  to="/manage-items"
                >
                  Manage Items
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    isActive("/manage-categories") ? "active-link" : ""
                  }`}
                  to="manage-categories"
                >
                  Manage Categories
                </NavLink>
              </li>
              <li className="nav-items">
                <NavLink
                  className={`nav-link ${
                    isActive("/manage-users") ? "active-link" : ""
                  }`}
                  to="/manage-users"
                >
                  Manage Users
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-items">
            <NavLink
              className={`nav-link ${
                isActive("/order-history") ? "acitve-link" : ""
              }`}
              to="/order-history"
            >
              Order History
            </NavLink>
          </li>
        </ul>
        {/*    Add Profile Bar Here */}
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle d-flex align-items-center"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle fs-4"></i>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="profileDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/settings">
                <i className="bi bi-gear me-2"></i> Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/activity-log">
                <i className="bi bi-clock-history me-2"></i> Activity Log
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={onLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
