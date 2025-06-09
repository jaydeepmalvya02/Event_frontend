import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in, redirect to login
  if (!user ||user.user.role && user.user.role!==role) {
    return <Navigate to="/" replace />;
  }

  // If logged in, allow access
  return children;
};

export default ProtectedRoute;
