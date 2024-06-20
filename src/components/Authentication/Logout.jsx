import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { clearCart } from '../../redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(clearCart())
    Cookies.remove("token");

    navigate('/');
  }, [dispatch, navigate]);

  return null;
}

export default Logout;