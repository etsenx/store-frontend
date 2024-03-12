import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";

import Home from "../pages/Home";
import Search from "../pages/Search/Search";
import Product from "../pages/Product/Product";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ChangePassword from "./Authentication/ChangePassword";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import Profile from "../pages/Profile/Profile";
import MyOrder from "../pages/Profile/MyOrder/MyOrder";
import StoreLayout from "../layout/StoreLayout";
import Cart from "../pages/Cart/Cart";

library.add(faStar, faStarReg);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/change" element={<ChangePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/me/orders" element={<MyOrder />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin/*">
          <Route index element={<Home />} />
          <Route path="users" element={<Product />} />
          <Route path="products" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}



export default App;
