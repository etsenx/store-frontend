import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import './Navbar.css';

function NavbarSkeleton() {
  return (
    <div className='navbar'>
      {/* Logo */}
      <Link to='/'>
        <Skeleton variant='rect' width={100} height={50} style={{ marginRight: '1rem' }} />
      </Link>

      {/* Search Bar */}
      <div className='search-bar-container'>
        <Skeleton variant='rect' width={300} height={40} style={{ marginRight: '1rem' }} />
        <Skeleton variant='rect' width={40} height={40} />
      </div>

      {/* Right Container */}
      <div className='right-container'>
        {/* Cart */}
        <Skeleton variant='rect' width={80} height={40} style={{ marginRight: '1rem' }} />

        {/* Dropdown */}
        <div className='dropdown'>
          <Skeleton variant='circle' width={40} height={40} style={{ marginRight: '1rem' }} />
          <Skeleton variant='text' width={100} />
        </div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;
