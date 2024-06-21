import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const checkAdminPrivilege = (isAuthenticated, user) => {
  return isAuthenticated && user?.privilege === "admin";
};

function ProtectedRoute() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!checkAdminPrivilege(isAuthenticated, user)) {
      navigate("/", { state: { toast: { severity: 'error', summary: 'Error', detail: 'You do not have permission to access the admin area' } } });
    }
  }, [isAuthenticated, navigate, user]);

  return <Outlet />;
}

export default ProtectedRoute;