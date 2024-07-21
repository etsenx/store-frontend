import { Skeleton } from "@mui/material";
import "./EditImage.css";

const EditImageSkeleton = () => {
  return (
    <div className="w-full">
      <form className="edit-product-image-form ml-5">
        <h1 className="edit-product-image-title">Upload Product Images</h1>
        <div>
          <Skeleton variant="rectangular" width={300} height={118} className="mb-3" />
          <Skeleton variant="rectangular" width={300} height={118} className="mb-3" />
          <Skeleton variant="rectangular" width={300} height={118} className="mb-3" />
        </div>
      </form>
    </div>
  );
};

export default EditImageSkeleton;
