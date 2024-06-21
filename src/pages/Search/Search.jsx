import "./Search.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import { Slider } from "@mui/material";

import ProductCard from "../../components/ProductCard/ProductCard";
import ReviewStars from "../../components/ReviewStars/ReviewStars";
import Categories from "../../components/Categories/Categories";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";

function Search() {
  const { term } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [productNotFound, setProductNotFound] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = `${import.meta.env.VITE_REACT_API_URL}/products?term=${term}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.length === 0) {
          setProductNotFound(true);
          setMinPrice(0);
          setMaxPrice(0);
          setCategories([]);
        } else {
          setProductNotFound(false);
          const categoryIds = res.data.map((product) => product.category);
          const idsString = categoryIds.join(",");
          axios
            .get(
              `${
                import.meta.env.VITE_REACT_API_URL
              }/categories?ids=${idsString}`
            )
            .then((res) => {
              setCategories(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
          setProducts(res.data);
          setShowProducts(res.data);
          const prices = res.data.map((product) => product.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setSliderValue([min, max]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [term]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const minDistance = 50;

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPrice - minDistance);
        setSliderValue([
          parseFloat(Math.max(clamped, minPrice).toFixed(2)),
          parseFloat(
            Math.max(clamped + minDistance, minPrice + minDistance).toFixed(2)
          ),
        ]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSliderValue([
          parseFloat(Math.max(clamped - minDistance, minPrice).toFixed(2)),
          parseFloat(Math.max(clamped, minPrice + minDistance).toFixed(2)),
        ]);
      }
    } else {
      setSliderValue([
        parseFloat(Math.max(newValue[0], minPrice).toFixed(2)),
        parseFloat(Math.max(newValue[1], minPrice + minDistance).toFixed(2)),
      ]);
    }
    filterProducts({ sliderValue: [newValue[0], newValue[1]] });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts({ categoryId });
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    filterProducts({ rating });
  };

  const filterProducts = useCallback(
    ({
      categoryId = selectedCategory,
      rating = selectedRating,
      sliderValue: [min, max] = sliderValue,
    } = {}) => {
      const filteredProducts = products.filter((product) => {
        const matchesCategory = categoryId
          ? product.category === categoryId
          : true;
        const matchesRating = rating ? product.ratings >= rating : true;
        const matchesPrice = product.price >= min && product.price <= max;
        return matchesCategory && matchesRating && matchesPrice;
      });
      setShowProducts(filteredProducts);
      setProductNotFound(filteredProducts.length === 0);
    },
    [products, selectedCategory, selectedRating, sliderValue]
  );

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedRating, sliderValue, filterProducts]);

  return (
    <div className="search-page">
      <h1 className="title">Latest Products</h1>
      <div className="search-container">
        <div className="filter-container">
          <div className="filters">
            <div className="filter-slider">
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `$${value.toFixed(2)}`}
                min={minPrice}
                max={maxPrice}
                disableSwap
                step={0.01}
              />
            </div>
            <hr />
            <div className="filter-category">
              <Categories
                categories={categories}
                onSelectCategory={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>
            <hr />
            <div className="filter-rating">
              <h2>Ratings</h2>
              {[5, 4, 3, 2, 1].map((rating) => (
                <p
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  style={{
                    cursor: "pointer",
                    color: selectedRating === rating ? "#fea736" : "inherit",
                  }}
                >
                  <ReviewStars rating={rating} />
                </p>
              ))}
              {selectedRating !== null && (
                <p
                  onClick={() => handleRatingSelect(null)}
                  style={{
                    cursor: "pointer",
                    color: "#fea736",
                  }}
                >
                  Clear
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="search-products-container">
          <div className="search-products-items">
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : productNotFound ? (
              <h2>No Products Found</h2>
            ) : (
              showProducts
                .slice(first, first + rows)
                .map((product) => (
                  <ProductCard key={product._id} data={product} />
                ))
            )}
          </div>
          {showProducts.length !== 0 && (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={showProducts.length}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
