import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";

const checkAdminPrivilege = (isAuthenticated, user) => {
  return isAuthenticated && user?.privilege === "admin";
};

function AdminRoute() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);

  useEffect(() => {
    if (!checkAdminPrivilege(isAuthenticated, user)) {
      navigate("/", { state: { toast: { severity: 'error', summary: 'Error', detail: 'You do not have permission to access the admin area' } } });
    }
  }, [isAuthenticated, navigate, user]);

  return <Outlet />;
}

export default AdminRoute;