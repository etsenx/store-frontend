import "./ProductCard.css";

import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

import ReviewStars from "../ReviewStars/ReviewStars";
import Button from "../Button/Button";

function ProductCard() {
  return (
    <div className="product-card">
      <img src="https://dummyimage.com/260x200/000/fff.jpg" />
      <div className="product-card-title-container">
        <Link to="/product/id">
          <h2 className="product-card-title">
            Bose QuietComfort 35 II Wireless Bluetooth Headphones
          </h2>
        </Link>
      </div>
      <div className="product-card-bottom-container">
        <div className="product-card-review-container">
          <ReviewStars rating={0} />
          <span className="product-card-text-review">(0 Reviews)</span>
        </div>
        <p className="product-card-price">$315</p>
        <Link to="/product/id">
          <Button>View Details</Button>
          </Link>
      </div>
    </div>
  );
}

// ProductCard.propTypes = {
//   data: PropTypes.object,
// }

export default ProductCard;
