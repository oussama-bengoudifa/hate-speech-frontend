import { Routes, Route, Navigate } from "react-router-dom";

//pages
import { Login, Dashboard, LoginNew, ForgetPassword } from "./pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<Login />} />

      <Route path="/login" element={<LoginNew />} />
      <Route path="/forget-password" element={<ForgetPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/register" replace />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
