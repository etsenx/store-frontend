import "./ProductCard.css";

import { useState } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ReviewStars from "../ReviewStars/ReviewStars";
import Button from "../Button/Button";
import { AdvancedImage } from "@cloudinary/react";
import cld from "../../utils/CloudinaryInstance";
import { fit } from "@cloudinary/url-gen/actions/resize";

import { Skeleton } from "primereact/skeleton";

function ProductCard(props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const images = props.data.images;
  const rating = props.data.ratings;
  let imageUrl = "tripleshop/product-example";
  let productImage = null;

  if (images.length > 0) {
    const primaryImage = images.find((image) => image.isPrimary);
    imageUrl = primaryImage ? primaryImage.link : images[0].link;
  }

  productImage = cld.image(imageUrl).resize(fit().width(260).height(200));

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="product-card">
      {!isImageLoaded && (
        <Skeleton shape="rectangle" width="260px" height="200px" />
      )}
      <div className="product-card-image-container">
        <AdvancedImage
          cldImg={productImage}
          className={`product-image ${isImageLoaded ? "loaded" : "loading"}`}
          onLoad={handleImageLoad}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      </div>
      <div className="product-card-title-container">
        <Link to={`/product/${props.data._id}`}>
          <h2 className="product-card-title">{props.data.name}</h2>
        </Link>
      </div>
      <div className="product-card-bottom-container">
        <div className="product-card-review-container">
          <ReviewStars rating={rating} />
          <span className="product-card-text-review">
            ({props.data.totalReviews} Reviews)
          </span>
        </div>
        <p className="product-card-price">${props.data.price}</p>
        <Link to={`/product/${props.data._id}`}>
          <Button className="product-card-button">View Details</Button>
        </Link>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  data: PropTypes.object,
};

export default ProductCard;
