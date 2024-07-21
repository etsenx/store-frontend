import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";
import { addToCart } from "../../redux/cart/cartService";

import cld from "../../utils/CloudinaryInstance";
import { AdvancedImage } from "@cloudinary/react";
import { fit } from "@cloudinary/url-gen/actions/resize";

import { Skeleton } from "primereact/skeleton";
import { Paginator } from "primereact/paginator";

import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ObjectId from "bson-objectid";

import ReviewStars from "../../components/ReviewStars/ReviewStars";
import Reviews from "../../components/Reviews/Reviews";
import Button from "../../components/Button/Button";
import ReviewModal from "../../components/ReviewModal/ReviewModal"; // Import the modal

import "./Product.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

Modal.setAppElement("#root");

function Product() {
  const toast = useRef();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [stockStatus, setStockStatus] = useState(false);
  const [product, setProduct] = useState({});
  const [requestCount, setRequestCount] = useState(1);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPrimaryImageLoaded, setIsPrimaryImageLoaded] = useState(false);
  const [isSecondaryImageLoaded, setIsSecondaryImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useSelector(selectAuth);

  const [reviewsFirst, setReviewsFirst] = useState(0);
  const [reviewsRowsPerPage, setReviewsRowsPerPage] = useState(3);
  const [totalReviews, setTotalReviews] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserIdFromToken = () => {
    const jwt = Cookies.get("token");
    if (!jwt) return false;
    const decoded = jwtDecode(jwt);
    return decoded._id;
  };

  const userId = isAuthenticated ? getUserIdFromToken() : null;

  const fetchAllReviews = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/product/${id}/reviews`
      );
      const reviews = res.data.reviews;
      const userIds = reviews.map((review) => review.user);
      const userRes = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/users/username`,
        { userIds }
      );
      const users = userRes.data;

      const userMapping = users.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
      }, {});
      const reviewsWithUsernames = reviews.map((review) => ({
        ...review,
        userName: userMapping[review.user] || review.user,
      }));

      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: reviewsWithUsernames,
      }));

      setTotalReviews(reviewsWithUsernames.length);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const fetchProductData = useCallback(async () => {
    if (!ObjectId.isValid(id)) {
      navigate("/", {
        state: {
          toast: {
            severity: "error",
            summary: "Error",
            detail: "Product not found",
          },
        },
      });
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/product/${id}`
      );
      const productData = res.data;

      const sortedImages = productData.images.length
        ? productData.images.sort((a, b) => b.isPrimary - a.isPrimary)
        : [];
      const imagesWithUUID = sortedImages.map((image) => ({
        ...image,
        uuid: uuidv4(),
      }));

      const primaryImageUrl = imagesWithUUID.length
        ? imagesWithUUID[0].link
        : "tripleshop/product-example";

      setPrimaryImage(
        cld.image(primaryImageUrl).resize(fit().width(600).height(600))
      );
      setSelectedImage(imagesWithUUID.length ? imagesWithUUID[0].uuid : null);
      setProduct({
        ...productData,
        images: imagesWithUUID,
      });
      setStockStatus(productData.stock > 0);

      await fetchAllReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, fetchAllReviews, navigate]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleIncrement = useCallback(() => {
    setRequestCount((prevCount) => prevCount + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setRequestCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  }, []);

  const handleChange = useCallback((event) => {
    const value = parseInt(event.target.value, 10);
    setRequestCount(value > 0 ? value : 1);
  }, []);

  const handlePrimaryImageLoad = useCallback(() => {
    setIsPrimaryImageLoaded(true);
  }, []);

  const handleSecondaryImageLoad = useCallback(() => {
    setIsSecondaryImageLoaded(true);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleReviewSubmit = useCallback(
    async (review) => {
      setLoading(true);
      const jwt = Cookies.get("token");
      try {
        await axios.put(
          `${import.meta.env.VITE_REACT_API_URL}/product/${id}/add-review`,
          {
            review: review.reviewText,
            rating: review.rating,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        fetchProductData();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [id, fetchProductData]
  );

  const reviewElements = useMemo(() => {
    if (!product.reviews || !Array.isArray(product.reviews)) {
      return null;
    }
    return product.reviews
      .slice(reviewsFirst, reviewsFirst + reviewsRowsPerPage)
      .map((review) => (
        <Reviews
          key={uuidv4()}
          review={review.review}
          rating={review.rating}
          user={review.userName}
        />
      ));
  }, [product.reviews, reviewsFirst, reviewsRowsPerPage]);

  const onReviewsPageChange = (event) => {
    setReviewsFirst(event.first);
    setReviewsRowsPerPage(event.rows);
  };

  const addItemToCart = async () => {
    if (!stockStatus) {
      return;
    }
    if (product.stock < requestCount) {
      toast.current.show({
        severity: "error",
        summary: "Insufficient Stock",
        detail: "Insufficient stock for this product",
        life: 3000,
      });
      return;
    }
    const reqProduct = {
      productId: product._id,
      image: product.images[0],
      name: product.name,
      price: product.price,
      reqCount: requestCount,
    };
    dispatch(addToCart(reqProduct));
  };

  if (loading) {
    return (
      <ClipLoader
        color="#FEBD69"
        loading={loading}
        size={70}
        cssOverride={{ display: "block", margin: "300px auto" }}
      />
    );
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="product-page">
        <div className="product-page-container">
          <div className="product-page-image-container">
            {!isPrimaryImageLoaded && (
              <Skeleton shape="rectangle" width="600px" height="600px" />
            )}
            <div className="product-page-primary-image-container">
              <AdvancedImage
                cldImg={primaryImage}
                className="my-auto"
                onLoad={handlePrimaryImageLoad}
              />
            </div>
            <div className="product-page-secondary-image-container">
              {product.images.length !== 0 &&
                product.images.map((image) => (
                  <div
                    className={`product-page-secondary-image ${
                      selectedImage === image.uuid ? "selected-image" : ""
                    }`}
                    key={image.uuid}
                    onClick={() => {
                      setPrimaryImage(
                        cld
                          .image(image.link)
                          .resize(fit().width(600).height(600))
                      );
                      setSelectedImage(image.uuid);
                    }}
                  >
                    {!isSecondaryImageLoaded && (
                      <Skeleton
                        shape="rectangle"
                        width="120px"
                        height="120px"
                      />
                    )}
                    <AdvancedImage
                      cldImg={cld
                        .image(image.link)
                        .resize(fit().width(120).height(120))}
                      className="my-auto"
                      onLoad={handleSecondaryImageLoad}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="product-page-detail">
            <h1 className="product-page-title">{product.name}</h1>
            <p className="product-page-product-id">Product # {product._id}</p>
            <hr />
            <p className="product-page-rating">
              <ReviewStars rating={product.ratings} />{" "}
              <span className="product-page-rating-text">
                ({totalReviews} Reviews)
              </span>
            </p>
            <hr />
            <p className="product-page-price">${product.price}</p>
            <div className="product-page-quantity">
              <button
                className="product-page-quantity-button"
                style={{ backgroundColor: "#dc3545" }}
                onClick={handleDecrement}
                disabled={!stockStatus}
              >
                {" "}
                -{" "}
              </button>
              <input
                className="product-page-quantity-text"
                value={requestCount}
                onChange={handleChange}
                disabled={!stockStatus}
              />
              <button
                className="product-page-quantity-button"
                style={{ backgroundColor: "#007bff" }}
                onClick={handleIncrement}
                disabled={!stockStatus}
              >
                {" "}
                +{" "}
              </button>
              <Button
                className="product-page-add"
                onClick={addItemToCart}
                isDisabled={!stockStatus}
              >
                Add to Cart
              </Button>
            </div>
            <hr />
            <p style={{ margin: "25px 0" }}>
              Status:{" "}
              <span
                className="product-page-stock"
                style={
                  stockStatus ? { color: "#28a745" } : { color: "#dc3545" }
                }
              >
                {stockStatus ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <hr />
            <div className="produt-page-description">
              <h2 className="product-page-description-title">Description:</h2>
              <p className="product-page-description-text">
                {product.description}
              </p>
            </div>
            <hr />
            <p>
              Sold by:{" "}
              <span className="product-page-seller-name">{product.seller}</span>
            </p>
            {isAuthenticated && product.reviews ? (
              product.reviews.some((review) => review.user === userId) ? (
                <p style={{ color: "red" }}>
                  You have already submitted a review
                </p>
              ) : (
                <Button
                  className="product-page-submit-review"
                  onClick={handleModalOpen}
                >
                  Submit your Review
                </Button>
              )
            ) : (
              <p>Login to submit a review</p>
            )}
          </div>
        </div>
        <div className="product-page-review">
          <h2 className="product-page-review-heading">Other{"'"}s Reviews:</h2>
          <hr />
          {product.reviews && product.reviews.length > 0 ? (
            <>
              {reviewElements}
              <Paginator
                first={reviewsFirst}
                rows={reviewsRowsPerPage}
                totalRecords={totalReviews}
                onPageChange={onReviewsPageChange}
              />
            </>
          ) : (
            <p>No Reviews Yet</p>
          )}
        </div>
      </div>
      <ReviewModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleReviewSubmit}
      />
      <ConfirmDialog draggable={false} />
    </>
  );
}

export default Product;
