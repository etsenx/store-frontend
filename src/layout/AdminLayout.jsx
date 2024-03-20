import { Outlet } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu/AdminMenu';

function AdminLayout() {
  return (
    <>
      <h1 className='text-center mt-4'>Admin Dashboard</h1>
      <div className='mx-auto w-7 mt-7 flex gap-8'>
        <AdminMenu />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
