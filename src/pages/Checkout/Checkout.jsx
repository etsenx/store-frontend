import { useState } from "react";
import { Steps } from "primereact/steps";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";
import Shipping from "../../components/Checkout/Shipping/Shipping";
import ConfirmOrder from "../../components/Checkout/ConfirmOrder/ConfirmOrder";
import Payment from "../../components/Checkout/Payment/Payment";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart/cartSlice";

function Checkout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    phoneNumber: "",
    zipCode: "",
    selectedCountry: "",
    country: "",
  });
  const [amount, setAmount] = useState(0);
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    { label: "Shipping" },
    { label: "Confirm Order" },
    { label: "Payment" },
  ];

  const handleStepClick = (index) => {
    if (index <= activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleNextStep = (updatedDetails) => {
    if (updatedDetails.amount) {
      setAmount(updatedDetails.amount);
    }
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const handleOrderSubmit = () => {
    dispatch(clearCart());
    navigate("/me/orders");
  };

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <Shipping
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            onNext={() => setActiveIndex(1)}
          />
        );
      case 1:
        return (
          <ConfirmOrder
            user={user}
            shippingInfo={shippingInfo}
            onPrevious={() => setActiveIndex(0)}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <Payment
            onNext={handleOrderSubmit}
            orderDetails={{ shippingDetails: shippingInfo, amount }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="card flex flex-column align-items-center justify-content-center mt-4 mb-6">
      <Steps
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => handleStepClick(e.index)}
        readOnly={false}
        className="w-6"
      />
      <div className="steps-content mt-4">{renderContent()}</div>
    </div>
  );
}

export default Checkout;
