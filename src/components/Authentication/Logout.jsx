// Logout.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    dispatch(logout());
    Cookies.remove("token");

    // Navigate to the home page or any other page after logout
    navigate('/');
  }, [dispatch, navigate]);

  return null; // This component doesn't render anything
}

export default Logout;