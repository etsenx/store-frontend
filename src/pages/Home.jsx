import "./Home.css";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard/ProductCard";
import { Paginator } from "primereact/paginator";
import ProductCardSkeleton from "../components/ProductCard/ProductCardSkeleton";
import axios from "axios";

function Home() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/products?limit=16`).then((res) => {
      setProducts(res.data);
    })
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="home-page">
      <h1 className="title">Latest Products</h1>
      <div className="home-product-container">
        {products.length === 0 ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          products
            .slice(first, first + rows)
            .map((product) => <ProductCard key={product._id} data={product} />)
        )}
      </div>
      {products.length !== 0 && (
        <Paginator
          first={first}
          rows={rows}
          totalRecords={products.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default Home;
