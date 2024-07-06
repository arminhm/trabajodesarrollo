import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {jwtDecode} from "jwt-decode";

function PrivateRoute({ children }) {
  const { auth } = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  const decodedToken = jwtDecode(auth.token);
  const userRole = decodedToken.role;

  
  const pathRoleMap = {
    "/nuevo-coffee": "ROLE_ADMIN",
    "/manage-coffee": "ROLE_ADMIN",
  };

  const requiredRole = pathRoleMap[location.pathname];

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

  return children;
}

export { PrivateRoute };
