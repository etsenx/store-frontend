import "./ProductCard.css";

import { Skeleton } from "primereact/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <Skeleton shape="rectangle" width="260px" height="200px" />
      <div className="product-card-title-container">
        <Skeleton width="100%" height="20px" className="mt-4" />
      </div>
      <div className="product-card-bottom-container">
        <div className="product-card-review-container">
          <Skeleton width="170px" />
        </div>
        <Skeleton className="product-card-price" width="60px" />
        <Skeleton width="100%" height="40px" className="mt-5" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
