import "./Home.css";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

// import SwitchPage from "../components/SwitchPage/SwitchPage";
import ProductCard from "../components/ProductCard/ProductCard";
import { Paginator } from "primereact/paginator";

function Home() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="home-page">
      <ClipLoader
        color="#FEBD69"
        loading={false}
        size={70}
        cssOverride={{ display: "block", margin: "300px auto" }}
      />
      <h1 className="title">Latest Products</h1>
      <div className="home-product-container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={15}
        onPageChange={onPageChange}
      />
      {/* <SwitchPage /> */}
    </div>
  );
}

export default Home;
