import "./Reviews.css";
import PropTypes from "prop-types";
import ReviewStars from "../ReviewStars/ReviewStars";

function Reviews({ rating, review, user }) {
  return (
    <div className="review">
      <ReviewStars rating={rating} className="review-star" />
      <p className="review-by">by {user}</p>
      <p>{review}</p>
      <hr />
    </div>
  );
}

Reviews.propTypes = {
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};


export default Reviews;
