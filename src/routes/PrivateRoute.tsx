import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface PrivateRouteProps {
  role?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
