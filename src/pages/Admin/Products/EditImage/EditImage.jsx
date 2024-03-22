import { InputText } from "primereact/inputtext";
import Button from "../../../../components/Button/Button";

function EditImage() {
  return (
    <div className="w-full">
      <form className="add-product-form ml-5">
        <h1 className="add-product-title">Upload Product Images</h1>
        <label
          className="block mb-2"
          htmlFor="multiple_files"
        >
          Choose Images
        </label>
        <input
          className="block w-full"
          id="multiple_files"
          type="file"
          multiple
        ></input>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
        />
        <Button className="add-product-button mt-3">CREATE</Button>
      </form>
    </div>
  );
}

export default EditImage;
