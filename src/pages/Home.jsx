import "./Home.css";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

// import SwitchPage from "../components/SwitchPage/SwitchPage";
import ProductCard from "../components/ProductCard/ProductCard";
import { Paginator } from "primereact/paginator";

function Home() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);

  const products = [
    { title: "Bose QuietComfort 35 II Wireless Bluetooth Headphones", price: "$315", rating: "0", image: "https://dummyimage.com/260x200/000/fff.jpg" },
    { title: "Iphone 16 Pro", price: "$2015", rating: "0", image: "https://dummyimage.com/260x200/000/fff.jpg" },
    { title: "Monitor AOC", price: "$99", rating: "0", image: "https://dummyimage.com/260x200/000/fff.jpg" },
    { title: "Keyboard Keychron A2", price: "$89", rating: "0", image: "https://dummyimage.com/260x200/000/fff.jpg" },
    { title: "Keyboard Achron", price: "$59", rating: "0", image: "https://dummyimage.com/260x200/000/fff.jpg" }
  ];

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
        {products.slice(first, first + rows).map((product, index) => (
          <ProductCard key={index} data={product} />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={products.length}
        onPageChange={onPageChange}
      />
      {/* <SwitchPage /> */}
    </div>
  );
}

export default Home;
