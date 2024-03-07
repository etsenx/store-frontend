import "./Search.css";
import ReactSlider from "react-slider";
// import { useParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
import ReviewStars from "../../components/ReviewStars/ReviewStars";
import Categories from "../../components/Categories/Categories";
import SwitchPage from "../../components/SwitchPage/SwitchPage";

function Search() {
  // const { id } = useParams();
  return (
    <div className="search-page">
      <h1 className="title">Latest Products</h1>
      <div className="search-container">
        <div className="filter-container">
          <div className="filters">
            <div className="filter-slider">
              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                thumbActiveClassName="thumb-active"
                markClassName="text"
                defaultValue={[0, 100]}
                pearling
                minDistance={10}
              />
            </div>
            <hr />
            <div className="filter-category">
              <Categories />
            </div>
            <hr />
            <div className="filter-rating">
              <h2>Ratings</h2>
              <p>
                <ReviewStars rating="5" />
              </p>
              <p>
                <ReviewStars rating="4" />
              </p>
              <p>
                <ReviewStars rating="3" />
              </p>
              <p>
                <ReviewStars rating="2" />
              </p>
              <p>
                <ReviewStars rating="1" />
              </p>
            </div>
          </div>
        </div>
        <div className="search-products-container">
          <div className="search-products-items">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        <SwitchPage />
        </div>
      </div>
    </div>
  );
}

export default Search;
