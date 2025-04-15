import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
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
      {/* <Route path="profile" element={<TrainerProfile />} /> */}
    </Route>
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
