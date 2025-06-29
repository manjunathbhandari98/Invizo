import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import OrderHistory from "./components/OrderHistory/OrderHistory.jsx";
import { AppContext } from "./context/AppContext.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Login from "./pages/Login/Login.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  // Redirect logged-in users away from login page
  const LoginRoute = ({ element }) => {
    return auth.token ? <Navigate to="/dashboard" replace /> : element;
  };

  // Restrict all other routes if not logged in
  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  return (
    <div>
      {/* Show MenuBar only when logged in */}
      {auth.token && location.pathname !== "/login" && <MenuBar />}

      <Toaster />
      <Routes>
        {/* Login Route - only accessible if not logged in */}
        <Route path="/login" element={<LoginRoute element={<Login />} />} />

        {/* Protected Routes (everyone logged in) */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/explore"
          element={<ProtectedRoute element={<Explore />} />}
        />
        <Route
          path="/order-history"
          element={<ProtectedRoute element={<OrderHistory />} />}
        />

        {/* Admin Only */}
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/manage-categories"
          element={
            <ProtectedRoute
              element={<ManageCategory />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/manage-items"
          element={
            <ProtectedRoute
              element={<ManageItems />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        {/* Fallback: If path is `/`, go to Dashboard if logged in */}
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />

        {/* Catch-all: redirect unknown routes to /dashboard if logged in or /login if not */}
        <Route
          path="*"
          element={
            auth.token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
