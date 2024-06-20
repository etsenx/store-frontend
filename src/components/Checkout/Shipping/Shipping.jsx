import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import Button from "../../Button/Button";
import { Toast } from "primereact/toast";
import { useMemo, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import countryList from "react-select-country-list";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./Shipping.css";

function Shipping({ shippingInfo, setShippingInfo, onNext }) {
  const toast = useRef();
  const [isSubmitting] = useState(false);

  const options = useMemo(() => countryList().getData(), []);
  const NumberOnlyRegex = /^[0-9]*$/;
  const LetterContainRegEx = /[a-zA-z]/;
  const ZIP_CODE_LENGTH = 5;

  const checkZipCode = (e) => {
    const changes = e.target.value;
    if (changes.length !== ZIP_CODE_LENGTH + 1 && !LetterContainRegEx.test(changes) && NumberOnlyRegex.test(changes)) {
      setShippingInfo({ ...shippingInfo, zipCode: changes });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmSubmit();
  };

  const confirmSubmit = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: acceptSubmit,
    });
  };

  const acceptSubmit = () => {
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.phoneNumber || !shippingInfo.zipCode || !shippingInfo.selectedCountry) {
      console.log("Please fill all the input");
    } else {

      onNext();
    }
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <h2 className="shipping-title">Shipping Info</h2>
      <label htmlFor="address">Address</label>
      <input
        id="address"
        type="text"
        value={shippingInfo.address}
        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        required
      />
      <label htmlFor="city">City</label>
      <input
        id="city"
        type="text"
        value={shippingInfo.city}
        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
        required
      />
      <label htmlFor="phone">Phone No</label>
      <PhoneInput
        placeholder="Enter phone number"
        value={shippingInfo.phoneNumber}
        onChange={(value) => setShippingInfo({ ...shippingInfo, phoneNumber: value })}
        required
      />
      <label htmlFor="zip-code">Zip Code</label>
      <input
        id="zip-code"
        type="text"
        value={shippingInfo.zipCode}
        onChange={checkZipCode}
        required
      />
      <label htmlFor="country">Country</label>
      <Dropdown
        value={shippingInfo.selectedCountry}
        onChange={(e) => setShippingInfo({ ...shippingInfo, selectedCountry: e.value, country: countryList().getLabel(e.value) })}
        options={options}
        optionLabel="label"
        placeholder="Select a Country"
        className="w-full p-0 country-dropdown mb-4"
        required
      />
      <Button
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
        className="shipping-button"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Continue"}
      </Button>
      <ConfirmDialog draggable={false} />
    </form>
  );
}

Shipping.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  setShippingInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Shipping;
