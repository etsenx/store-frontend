import "./Reviews.css";

import ReviewStars from "../ReviewStars/ReviewStars";

function Reviews() {
  return (
    <div className="review">
      <ReviewStars rating={5} className="review-star" />
      <p className="review-by">by Steven</p>
      <p>Sweet Apples. Fresh & Healthy</p>
      <hr />
    </div>
  );
}

export default Reviews;
