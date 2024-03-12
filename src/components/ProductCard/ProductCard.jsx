import "./ProductCard.css";

import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewStars from "../ReviewStars/ReviewStars";

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
          {/* <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} />
          <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} />
          <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} />
          <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} />
          <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} /> */}
          <ReviewStars rating={0} />
          <span className="product-card-text-review">(0 Reviews)</span>
        </div>
        <p className="product-card-price">$315</p>
        <Link to="/product/id"><button className="product-card-button">View Details</button></Link>
      </div>
    </div>
  );
}

// ProductCard.propTypes = {
//   data: PropTypes.object,
// }

export default ProductCard;
