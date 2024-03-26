import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

import Button from "../../../../components/Button/Button";

function Edit() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="w-full">
      <form className="add-product-form ml-5">
        <h1 className="add-product-title">New Product</h1>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
        />
        <label htmlFor="product-description">Description</label>
        <InputTextarea
          id="product-description"
          className="w-full p-0"
          cols={5}
          rows={8}
        />
        <div className="grid mt-3">
          <div className="col-6 flex flex-column">
            <label htmlFor="product-price">Price</label>
            <InputNumber
              inputId="product-price"
              inputClassName="p-inputtext-sm p-0"
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div className="col-6 flex flex-column">
            <label htmlFor="product-stock">Stock</label>
            <InputText id="product-stock" className="p-inputtext-sm p-0" />
          </div>
        </div>
        <div className="grid">
          <div className="col-6 flex flex-column">
            <label htmlFor="product-category">Category</label>
            <div className="w-full product-dropdown">
              <Dropdown
                className="p-0 product-dropdown w-full"
                options={cities}
                optionLabel="name"
                placeholder="Select Category"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
              />
            </div>
          </div>
          <div className="col-6 flex flex-column">
            <label htmlFor="product-seller">Seller Name</label>
            <InputText id="product-seller" className="p-inputtext-sm p-0" />
          </div>
        </div>
        <Button className="add-product-button mt-3">UPDATE</Button>
      </form>
    </div>
  );
}

export default Edit;
