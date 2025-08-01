import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { adminUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!adminUser || adminUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
