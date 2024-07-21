import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import "./Categories.css";

function Categories({ categories, selectedCategory, onSelectCategory }) {
  const isLoading = categories.length === 0;

  return (
    <>
      <h2>Categories</h2>
      {isLoading ? (
        <>
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </>
      ) : (
        <>
          <p
            onClick={() => onSelectCategory(null)}
            style={{
              color: selectedCategory === null ? "#fea736" : "inherit",
              cursor: "pointer",
            }}
          >
            All
          </p>
          {categories.map((category) => (
            <p
              key={category._id}
              onClick={() => onSelectCategory(category._id)}
              style={{
                color:
                  selectedCategory === category._id ? "#fea736" : "inherit",
                cursor: "pointer",
              }}
            >
              {category.name}
            </p>
          ))}
        </>
      )}
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

export default Categories;
