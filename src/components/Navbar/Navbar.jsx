import "./Navbar.css";
import logo from "../../assets/logo.png";
import search from "../../assets/search-icon.png";
import dropdown from "../../assets/dropdown-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);

  return ref;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const navigate = useNavigate();

  function handleDropdownClick() {
    setIsOpen(!isOpen);
  }

  function handleInputChange(e) {
    setProductSearch(e.target.value)
  }

  function handleSubmitSearch() {
    navigate(`/search/${productSearch}`);
  }

  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} className="logo" />
      </Link>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Product Name ..."
          className="search-bar"
          value={productSearch}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSubmitSearch}>
          <img src={search} className="search-icon" />
        </button>
      </div>
      <div className="right-container">
        <Link to="/cart">
          Cart <span className="cart-count">0</span>
        </Link>
        <Link
          className="dropdown"
          ref={dropdownRef}
          onClick={handleDropdownClick}
        >
          <img
            src="https://dummyimage.com/35x35/000/fff.jpg"
            className="profile-picture"
          />
          Steven <img src={dropdown} className="dropdown-icon" />
        </Link>
        <div
          className="dropdown-content"
          style={isOpen ? { display: "block" } : { display: "none" }}
        >
          <Link to="/admin/dashboard">Admin Page</Link>
          <Link to="/me/orders">Orders</Link>
          <Link to="/me">Profile</Link>
          <Link>Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
