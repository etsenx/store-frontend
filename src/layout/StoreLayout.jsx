import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function StoreLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default StoreLayout;