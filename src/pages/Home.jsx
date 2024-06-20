import "./Home.css";
import { useEffect, useState, useRef } from "react";

import ProductCard from "../components/ProductCard/ProductCard";
import { Paginator } from "primereact/paginator";
import ProductCardSkeleton from "../components/ProductCard/ProductCardSkeleton";
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useLocation } from 'react-router-dom';

function Home() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (location.state && location.state.toast && !toastShown) {
      const { severity, summary, detail } = location.state.toast;
      toast.current.show({ severity, summary, detail });
      setToastShown(true);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location, toastShown]);

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
      <Toast ref={toast} />
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
