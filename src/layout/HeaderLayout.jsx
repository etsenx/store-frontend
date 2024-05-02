import React, { Suspense } from 'react';
// import Navbar from '../components/Navbar/Navbar';
import NavbarSkeleton from '../components/Navbar/NavbarSkeleton';

function HeaderLayout() {
  const Navbar = React.lazy(()  => import('../components/Navbar/Navbar'));
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  );
}

export default HeaderLayout;
