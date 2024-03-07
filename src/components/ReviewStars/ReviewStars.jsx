import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function ReviewStars(props) {
  const starsArray = [];
  let currentCreatedStars = 0;
  for (let i = 0; i < 5; i++) {
    if (currentCreatedStars < props.rating) {
      starsArray.push(
        <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: "#ffda1c" }} />
      );
    } else {
      starsArray.push(
        <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: "#ffda1c" }} />
      );
    }
    currentCreatedStars++;
  }
  return (
    <i>
      {starsArray}
    </i>
  );
}

ReviewStars.propTypes = {
  rating: PropTypes.number
}

export default ReviewStars;
