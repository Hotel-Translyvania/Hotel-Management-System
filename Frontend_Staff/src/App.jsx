import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GuestList from "./pages/Guests/GuestList";
import ReservationList from "./pages/Reservations/ReservationList";
import Food from "./pages/Food/Food";
import Staff from "./pages/Staff/Staff";
import Setting from "./pages/Setting/Setting";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import RoomList from "./pages/Room/RoomList";
import ResetPassLink from "./pages/Auth/ResetPassLink";
import AdminPage from "./pages/Admin/AdminPage";
import AdminDashboardLayout from "./components/Layout/AdminLayout";
import Managers from "./components/Admin/Managers";
import AdminSettingPage from "./components/Admin/AdminSetting";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { useAuthStore } from "./components/Auth/authStore";
import SpinPage from "./components/Spin/Spin";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, user, "in auth redirect");
    if (isAuthenticated && user) {
      if (user?.role === "admin") {
          navigate("/admin/hotels");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return children;
};

const App = () => {
  const { initializeAuth, user, loading, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading && user === null && isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <SpinPage />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <AuthRedirect>
              <ResetPassLink />
            </AuthRedirect>
          }
        />

        <Route
          path="/admin/signup"
          element={
            <ProtectedRoute requiredRole={["admin"]}>
              <Signup />
            </ProtectedRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute requiredRole={["manager", "staff"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guests" element={<GuestList />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/restaurant" element={<Food />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        {/* Manager-only route with layout */}
        <Route
          element={
            <ProtectedRoute requiredRole={["manager"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/staff" element={<Staff />} />
        </Route>

        {/* Admin-only routes */}
        <Route
          element={
            <ProtectedRoute requiredRole={["admin"]}>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/hotels" element={<AdminPage />} />
          <Route path="/admin/managers" element={<Managers />} />
          <Route
            path="/admin/settings"
            element={<AdminSettingPage AdminProfile={user} />}
          />
        </Route>
        <Route
          path="/unauthorized"
          element={
            <div className="flex justify-center items-center h-screen w-full bg-gray-100 shrink-0">
              <img
                src="/unauthorized.png"
                alt="Unauthorized"
                className="object-cover w-full h-full"
              />
            </div>
          }
        />

        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen w-full bg-gray-100">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-700">404</h1>
                <p className="text-lg text-gray-500">Page Not Found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
