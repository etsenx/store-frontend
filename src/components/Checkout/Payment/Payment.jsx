import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Button from "../../Button/Button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./Payment.css";
import axios from "axios";
import Cookies from "js-cookie";
import { selectAuth } from "../../../redux/auth/authSlice";
import { useSelector } from "react-redux";

function Payment({ onNext, orderDetails }) {
  const toast = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { user } = useSelector(selectAuth);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmSubmission();
  };

  const acceptSubmit = async () => {
    setIsSubmitting(true);

    const finalOrderDetails = {
      ...orderDetails,
      shippingDetails: {
        name: user.name,
        address: `${orderDetails.shippingDetails.address}, ${orderDetails.shippingDetails.city}, ${orderDetails.shippingDetails.zipCode}, ${orderDetails.shippingDetails.country}`,
        phoneNumber: orderDetails.shippingDetails.phoneNumber,
      },
      paymentMethod,
    };

    try {
      const jwt = Cookies.get("token");
      await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/order`,
        finalOrderDetails,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      toast.current.show({
        severity: "success",
        summary: "Order Submitted",
        detail: "Your order has been successfully submitted!",
        life: 3000,
      });

      if (onNext) onNext(finalOrderDetails);
    } catch (error) {
      if (error.response.status === 409) {
        toast.current.show({
          severity: "error",
          summary: "Insufficient Stock",
          detail: error.response.data.message,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Submission Error",
          detail: "There was an error submitting your order.",
          life: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmSubmission = () => {
    confirmDialog({
      message: "Are you sure you want to submit the order?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: acceptSubmit,
      reject: () => setIsSubmitting(false),
    });
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <h2 className="payment-title">Select Payment Method</h2>
      <RadioGroup
        aria-labelledby="payment-method-radio-group"
        value={paymentMethod}
        onChange={handlePaymentChange}
        name="payment-method-radio-group"
        className="mb-2"
      >
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
        {/* Add more payment options here if needed */}
      </RadioGroup>
      <Button
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
        className="payment-button"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Continue"}
      </Button>
      <ConfirmDialog draggable={false} />
    </form>
  );
}

Payment.propTypes = {
  onNext: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  amount: PropTypes.number,
};

export default Payment;
