import React, { useRef, useState, useEffect, useContext } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LiveTracking from "../components/LiveTracking";
import { createPayment, verifyPayment } from "../state/Payment/paymentSlice";
import CaptainLiveTracking from "../components/CaptainLiveTracking";
import { SocketContext } from "../context/SocketContext";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;
  const dispatch = useDispatch();

  const [paymentPanel, setPaymentPanel] = useState(false);
  const paymentPanelRef = useRef(null);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, success, failed
  const [captainLocation, setCaptainLocation] = useState(null);
  const { socket } = useContext(SocketContext);

  if (!socket) return;

  const userId = ride.user._id;

  useEffect(() => {
    socket.emit("join", { userId, userType: "user" });
  }, []);

  console.log(captainLocation);

  const { payment, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup
    return () => {
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    try {
      setPaymentStatus("processing");

      const payload = {
        amount: ride.fare * 100,
        currency: "INR",
        receipt: `receipt_${ride._id}`,
      };

      const res = await dispatch(createPayment(payload));

      if (!res.payload || !res.payload.order || !res.payload.order.id) {
        setPaymentStatus("failed");
        alert("Payment initiation failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: ride.fare * 100,
        currency: "INR",
        name: "Uber Clone",
        description: "Ride Payment",
        order_id: res.payload.order.id,
        handler: async function (response) {
          setPaymentStatus("verifying");

          const verificationPayload = {
            rideId: ride._id,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          const verifyRes = await dispatch(verifyPayment(verificationPayload));

          if (verifyRes.payload && verifyRes.payload.success) {
            setPaymentStatus("success");
            // Close payment panel after success
            setTimeout(() => {
              setPaymentPanel(false);
            }, 1500);
          } else {
            setPaymentStatus("failed");
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: ride.user.name,
          email: ride.user.email,
          contact: ride.user.phone || "", // Add phone if available
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setPaymentStatus("pending");
            console.log("Payment modal closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("failed");
      alert("Payment process failed: " + error.message);
    }
  };

  socket.on("payment-verified", (data) => {
    if (data.message.includes("navigate to home")) {
      navigate("/home");
    }
  });

  useGSAP(() => {
    gsap.to(paymentPanelRef.current, {
      transform: paymentPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [paymentPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <MdKeyboardArrowDown />
        </Link>
      </div>

      <div className="h-4/5 flex gap-4">
        {/* <LiveTracking /> */}
        <CaptainLiveTracking />
      </div>

      <div className="h-1/5 relative p-6 bg-yellow-400 flex flex-col items-center justify-center">
        <div
          onClick={() => setPaymentPanel(true)}
          className="absolute flex items-center justify-center top-4 rounded-xl w-12 h-5"
        >
          <MdKeyboardArrowUp className="text-3xl" />
        </div>
        <div className="w-full flex justify-between items-center">
          <h4 className="text-xl font-semibold">Enjoy Your Ride</h4>
          <button
            onClick={() => setPaymentPanel(true)}
            className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
          >
            Pay Now
          </button>
        </div>
      </div>

      <div
        ref={paymentPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <div className="flex items-center justify-between mb-6">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullName.firstName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={
            loading ||
            paymentStatus === "processing" ||
            paymentStatus === "verifying"
          }
          className={`w-full mt-5 ${
            loading ||
            paymentStatus === "processing" ||
            paymentStatus === "verifying"
              ? "bg-gray-400"
              : paymentStatus === "success"
              ? "bg-green-600"
              : paymentStatus === "failed"
              ? "bg-red-600"
              : "bg-green-600"
          } text-white font-semibold p-2 rounded-lg`}
        >
          {loading || paymentStatus === "processing"
            ? "Processing..."
            : paymentStatus === "verifying"
            ? "Verifying Payment..."
            : paymentStatus === "success"
            ? "Payment Successful"
            : paymentStatus === "failed"
            ? "Payment Failed - Try Again"
            : `Pay ₹${ride?.fare}`}
        </button>
      </div>
    </div>
  );
};

export default Riding;
