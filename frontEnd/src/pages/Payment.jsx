// Payment.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const options = location.state;

  useEffect(() => {
    if (!options) {
      navigate("/home");
      return;
    }

    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      document.body.appendChild(script);
    };

    loadRazorpay();
  }, [options, navigate]);

  return <h2>Processing Payment...</h2>;
};

export default Payment;
