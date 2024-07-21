import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

function ReviewStars(props) {
  function getDecimalPart(number) {
    return number - Math.floor(number);
  }
  const starsArray = [];
  for (let i = 0; i < 5; i++) {
    const key = uuidv4();
    if (i + 1 <= props.rating) {
      starsArray.push(
        <FontAwesomeIcon
          key={key}
          icon="fa-solid fa-star"
          style={{ color: "#ffda1c" }}
        />
      );
    } else if (
      i === Math.floor(props.rating) &&
      0.5 <= getDecimalPart(props.rating)
    ) {
      starsArray.push(
        <FontAwesomeIcon
          key={key}
          icon="fa-regular fa-star-half-stroke"
          style={{ color: "#ffda1c" }}
        />
      );
    } else {
      starsArray.push(
        <FontAwesomeIcon
          key={key}
          icon="fa-regular fa-star"
          style={{ color: "#ffda1c" }}
        />
      );
    }
  }
  return <i>{starsArray}</i>;
}

ReviewStars.propTypes = {
  rating: PropTypes.number,
};

export default ReviewStars;
