import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";

function UserRoute() {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { state: { toast: { severity: 'warn', summary: 'Warning', detail: 'Please login first' } } });
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
}

export default UserRoute;