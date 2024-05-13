import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';

import { useSelector, useDispatch } from 'react-redux';

import logo from '../../assets/logo.png';
import dropdown from '../../assets/dropdown-icon.png';

import { AdvancedImage } from "@cloudinary/react";
import cld from '../../utils/CloudinaryInstance';
import { fill } from '@cloudinary/url-gen/actions/resize';

import './Navbar.css';
import 'primeicons/primeicons.css';

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);

  return ref;
};

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const navigate = useNavigate();

  function handleDropdownClick() {
    setIsOpen(!isOpen);
  }

  function handleInputChange(e) {
    setProductSearch(e.target.value);
  }

  function handleSubmitSearch() {
    if (productSearch !== '') {
      navigate(`/search/${productSearch}`);
    }
  }

  function handleLogout() {
    setIsOpen(false);
    navigate("/logout");
  }

  const dropdownRef = useOutsideClick(() => setIsOpen(false));
  var userAvatar = "";
  if (isAuthenticated) {
    console.log(user.avatar);
    userAvatar = cld.image(user.avatar).resize(fill().width(35).height(35));
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={logo} className='logo' />
      </Link>
      <div className='search-bar-container'>
        <input
          type='text'
          placeholder='Enter Product Name ...'
          className='search-bar'
          value={productSearch}
          onChange={handleInputChange}
        />
        <button className='search-button' onClick={handleSubmitSearch}>
          <i style={{ fontWeight: '800' }} className='pi pi-search'></i>
        </button>
      </div>
      <div className='right-container'>
        <Link to={isAuthenticated ? "/cart" : "/login"}>
          Cart <span className='cart-count'>0</span>
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              className='dropdown'
              ref={dropdownRef}
              onClick={handleDropdownClick}
            >
              <AdvancedImage cldImg={userAvatar} className='profile-picture' />
              {user.name} <img src={dropdown} className='dropdown-icon' />
            </Link>
            <div
              className='dropdown-content'
              style={isOpen ? { display: 'block' } : { display: 'none' }}
            >
              {user.privilege === 'admin' ? <Link to='/admin/dashboard'>Dashboard</Link> : ""}
              <Link to='/me/orders'>Orders</Link>
              <Link to='/me'>Profile</Link>
              <Link to='/logout' onClick={handleLogout}>Logout</Link>
            </div>
          </>
        ) : (
          <Link to='/login'>
            <Button className='navbar__login-button'>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;


