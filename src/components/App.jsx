import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
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
} from "@fortawesome/free-regular-svg-icons";

import Home from "../pages/Home";
import Search from "../pages/Search/Search";
import Product from "../pages/Product/Product";
import Login from "./Authentication/Login";
import Logout from "./Authentication/Logout";
import Register from "./Authentication/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
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
import { default as EditImageProduct } from "../pages/Admin/Products/EditImage/EditImage";
import Users from "../pages/Admin/Users/Users";

import AdminLayout from "../layout/AdminLayout";
import HeaderLayout from "../layout/HeaderLayout";
import FooterLayout from "../layout/FooterLayout";

import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import cld from "../utils/CloudinaryInstance";

import Cookies from "js-cookie";

import axios from "axios";

import { ClipLoader } from "react-spinners";

import "primereact/resources/themes/lara-light-cyan/theme.css"; //theme
import "./App.css";

library.add(
  faStar,
  faStarReg,
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
          console.log(res.data);
        })
        .catch((err) => {
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

  const myImage = cld.image("cld-sample");
  myImage.resize(fill().width(250).height(250));

  return (
    <Router>
      <HeaderLayout />
      {/* <AdvancedImage cldImg={myImage} /> */}
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/orders" element={<MyOrder />} />
            <Route path="/me/order/:id" element={<OrderDetail />} />
            <Route path="/me/update" element={<UpdateProfile />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route
            path="products/:id/edit-image"
            element={<EditImageProduct />}
          />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
      <FooterLayout />
    </Router>
  );
}

export default App;
