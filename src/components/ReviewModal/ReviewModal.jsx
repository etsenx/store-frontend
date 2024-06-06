import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { InputTextarea } from "primereact/inputtextarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./ReviewModal.css";

const ReviewModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [reviewText, setReviewText] = useState("");

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ rating, reviewText });
    setRating(5);
    setReviewText("");
    onRequestClose();
  };

  const handleCloseModal = () => {
    setRating(5); // Reset rating to 5 stars when closing the modal
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="review-modal"
      overlayClassName="review-modal-overlay"
    >
      <h2>Submit your Review</h2>
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingClick(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#fea736" : "#ccc",
            }}
          >
            <FontAwesomeIcon
              icon={star <= rating ? solidStar : regularStar}
              style={{ color: "#ffda1c" }}
            />
          </span>
        ))}
      </div>
      <InputTextarea
        className="review-textbox"
        value={reviewText}
        onChange={handleReviewTextChange}
        placeholder="Write your review here..."
        autoResize
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Modal>
  );
};

ReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewModal;
