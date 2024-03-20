import { Menu } from 'primereact/menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

import './AdminMenu.css';

function AdminMenu() {
  const items = [
    {
      label: 'Dashboard',
      icon: (options) => (
        <DashboardIcon fontSize='small' {...options.iconProps} />
      ),
      className: "active-menuitem p-ripple"
    },
    {
      label: 'New Product',
      icon: (options) => <AddIcon fontSize='small' {...options.iconProps} />,
    },
    {
      label: 'Products',
      icon: (options) => (
        <InventoryIcon fontSize='small' {...options.iconProps} />
      ),
    },
    {
      label: 'Orders',
      icon: (options) => (
        <ReceiptIcon fontSize='small' {...options.iconProps} />
      ),
    },
    {
      label: 'Users',
      icon: (options) => <PersonIcon fontSize='small' {...options.iconProps} />,
    },
    {
      label: 'Reviews',
      icon: (options) => <StarIcon fontSize='small' {...options.iconProps} />,
    },
  ];
  return <Menu model={items} className='admin-page__menu my-4 w-3' />;
}

export default AdminMenu;
