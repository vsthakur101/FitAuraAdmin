import { Routes, Route, Navigate } from "react-router-dom";

/* 
******* Auth Flow *******
*/
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";

/* Auth Flow End */
import Dashboard from "../pages/trainer/Dashboard";
import Clients from "../pages/trainer/Clients";
import Layout from "../components/layout/Layout";
import RequireAuth from "../components/auth/RequireAuth";
import Progress from "../pages/trainer/Progress";
import Schedule from "../pages/trainer/Schedule";
import Profile from "../pages/trainer/Profile";
import Plans from "../pages/trainer/Plans";
import CreatePlan from "../pages/trainer/CreatePlan";
import PlanDetail from "../pages/trainer/PlanDetail";
import AssignedPlans from "../pages/trainer/AssignPlan";

import { ToastContainer } from 'react-toastify';

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/trainer"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="progress" element={<Progress />} />
        {/* <Route path="notes" element={<TrainerNotes />} /> */}
        <Route path="schedule" element={<Schedule />} />
        <Route path="profile" element={<Profile />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plans/create" element={<CreatePlan />} />
        <Route path="plans/:id" element={<PlanDetail />} />
        <Route path="assigned" element={<AssignedPlans />} />
        {/* <Route path="profile" element={<TrainerProfile />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnFocusLoss
      pauseOnHover
      theme="dark"
    />
  </>
);

export default AppRoutes;
