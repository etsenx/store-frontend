import { Menu } from "primereact/menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate, useLocation } from "react-router-dom";

import "./AdminMenu.css";

function AdminMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: (options) => (
        <DashboardIcon fontSize="small" {...options.iconProps} />
      ),
      command: () => navigate("/admin/dashboard"),
      className: location.pathname === "/admin/dashboard" ? "p-menuitem-active" : ""
    },
    {
      label: "New Product",
      icon: (options) => <AddIcon fontSize="small" {...options.iconProps} />,
      command: () => navigate("/admin/product/add"),
      className: location.pathname === "/admin/product/add" ? "p-menuitem-active" : ""
    },
    {
      label: "Products",
      icon: (options) => (
        <InventoryIcon fontSize="small" {...options.iconProps} />
      ),
      command: () => navigate("/admin/products"),
      className: location.pathname === "/admin/products" ? "p-menuitem-active" : ""
    },
    {
      label: "New Category",
      icon: (options) => <AddIcon fontSize="small" {...options.iconProps} />,
      command: () => navigate("/admin/category/add"),
      className: location.pathname === "/admin/category/add" ? "p-menuitem-active" : ""
    },
    {
      label: "Categories",
      icon: (options) => (
        <GridViewIcon fontSize="small" {...options.iconProps} />
      ),
      command: () => navigate("/admin/categories"),
      className: location.pathname === "/admin/categories" ? "p-menuitem-active" : ""
    },
    {
      label: "Orders",
      icon: (options) => (
        <ReceiptIcon fontSize="small" {...options.iconProps} />
      ),
      command: () => navigate("/admin/orders"),
      className: location.pathname === "/admin/orders" ? "p-menuitem-active" : ""
    },
    {
      label: "Users",
      icon: (options) => <PersonIcon fontSize="small" {...options.iconProps} />,
      command: () => navigate("/admin/users"),
      className: location.pathname === "/admin/users" ? "p-menuitem-active" : ""
    },
    {
      label: "Reviews",
      icon: (options) => <StarIcon fontSize="small" {...options.iconProps} />,
      command: () => navigate("/admin/reviews"),
      className: location.pathname === "/admin/reviews" ? "p-menuitem-active" : ""
    },
  ];

  return <Menu model={items} className="admin-page__menu my-4 w-3" />;
}

export default AdminMenu;
