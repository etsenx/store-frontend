import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/auth/authSlice";
import { getCart } from "../redux/cart/cartService";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faX,
  faTrash,
  faTrashCan,
  faEye,
  faPrint,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarReg,
  faImage as faImageReg,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";

import Home from "../pages/Home";
import Search from "../pages/Search/Search";
import Product from "../pages/Product/Product";
import Login from "./Authentication/Login";
import Logout from "./Authentication/Logout";
import Register from "./Authentication/Register";
import UserRoute from "./ProtectedRoute/UserRoute";
import AdminRoute from "./ProtectedRoute/AdminRoute";
import ChangePassword from "./Authentication/ChangePassword";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import Profile from "../pages/Profile/Profile";
import MyOrder from "../pages/Profile/MyOrder/MyOrder";
import Cart from "../pages/Cart/Cart";
import OrderDetail from "../pages/Profile/MyOrder/OrderDetail/OrderDetail";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import { default as AddProduct } from "../pages/Admin/Product/Add/Add";
import Products from "../pages/Admin/Products/Products";
import { default as EditProduct } from "../pages/Admin/Products/Edit/Edit";
import Orders from "../pages/Admin/Orders/Orders";
import { default as EditOrder } from "../pages/Admin/Orders/Edit/Edit";
import { default as EditImageProduct } from "../pages/Admin/Products/EditImage/EditImage";
import { default as AddCategory } from "../pages/Admin/Category/Add/Add";
import Categories from "../pages/Admin/Categories/Categories";
import { default as EditCategory } from "../pages/Admin/Categories/Edit/Edit";
import Users from "../pages/Admin/Users/Users";
import { default as EditUser } from "../pages/Admin/Users/Edit/Edit";
import Reviews from "../pages/Admin/Reviews/Reviews";
import Checkout from "../pages/Checkout/Checkout";

import AdminLayout from "../layout/AdminLayout";
import HeaderLayout from "../layout/HeaderLayout";
import FooterLayout from "../layout/FooterLayout";

import Cookies from "js-cookie";

import axios from "axios";

import { ClipLoader } from "react-spinners";

import "primereact/resources/themes/lara-light-amber/theme.css";
import "./App.css";

library.add(
  faStar,
  faStarReg,
  faStarHalfStroke,
  faX,
  faTrashCan,
  faTrash,
  faEye,
  faPrint,
  faPencil,
  faImageReg
);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = Cookies.get("token");
    if (jwt) {
      axios
        .get(`${import.meta.env.VITE_REACT_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          dispatch(login(res.data));
          dispatch(getCart());
        })
        .catch((err) => {
          Cookies.remove("token");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <ClipLoader
        color="#FEBD69"
        loading={loading}
        size={70}
        cssOverride={{ display: "block", margin: "300px auto" }}
      />
    );
  }

  return (
    <Router>
      <HeaderLayout />
      <div style={{minHeight: "700px"}}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/search/:term" element={<Search />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route element={<UserRoute />}>
              <Route path="/password/change" element={<ChangePassword />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/me/orders" element={<MyOrder />} />
              <Route path="/me/order/:id" element={<OrderDetail />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id/edit" element={<EditProduct />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id/edit" element={<EditCategory />} />
              <Route
                path="products/:id/edit-image"
                element={<EditImageProduct />}
              />
              <Route path="users" element={<Users />} />
              <Route path="users/:id/edit" element={<EditUser />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id/edit" element={<EditOrder />} />
              <Route path="reviews" element={<Reviews />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
      <FooterLayout />
    </Router>
  );
}

export default App;
