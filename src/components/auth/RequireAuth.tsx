// src/components/auth/RequireAuth.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { JSX } from "react";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
