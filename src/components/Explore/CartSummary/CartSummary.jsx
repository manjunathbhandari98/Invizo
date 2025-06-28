/* eslint-disable no-unused-vars */
// Required imports and context
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import { createOrder, deleteOrder } from "../../../service/orderService";
import {
  createRazorpayOrder,
  verifyOrder,
} from "../../../service/paymentService";
import RecieptPopup from "./../Reciept/RecieptPopup";
import "./CartSummary.css";

const RazorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const CartSummary = ({
  customerName,
  mobileNumber,
  setMobileNumber,
  setCustomerName,
}) => {
  const { cartItems, clearCart } = useContext(AppContext); // Getting cart items and clearCart from context
  // const RazorpayKey = AppConstants.RAZORPAY_KEY_ID;
  // Local state to handle payment logic
  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // Stores confirmed order

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;

  // Reset cart and customer data
  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  // Place order after payment
  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  // Save cart summary (print)
  const handlePrintReceipt = () => {
    window.print();
  };

  // Load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Delete order if payment fails
  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Handles payment logic for cash or UPI
  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please Enter customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your Cart is empty");
      return;
    }

    setIsProcessing(true);

    // Order object to be sent to backend
    const orderData = {
      customerName,
      mobileNumber,
      cartItems,
      subtotal,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    try {
      // Step 1: Save order in your backend
      const response = await createOrder(orderData);
      const savedData = response.data;

      // Step 2: For cash orders
      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
      }

      // Step 3: For online payment (UPI via Razorpay)
      else if (response.status === 201 && paymentMode === "upi") {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("Unable to open Razorpay");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        // Step 4: Create Razorpay Order via your backend
        const razorpayResponse = await createRazorpayOrder({
          amount: Math.round(grandTotal, 2),
          currency: "INR",
        });

        // Step 5: Setup Razorpay options
        const options = {
          key: RazorpayKey,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "My Retail Shop",
          description: "Order Payment",
          handler: async (response) => {
            // On success, verify payment
            console.log("Razorpay success response", response);
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399CC",
          },
          modal: {
            ondismiss: async () => {
              // Payment cancelled
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled");
            },
          },
        };

        // Open Razorpay popup
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (response) => {
          console.error("Payment failed", response);
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed");
        });
        rzp.open();
      }
    } catch (error) {
      console.error("Complete Payment Error:", error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Verifies Razorpay signature and updates order status
  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResponse = await verifyOrder(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error("Payment Failed");
    }
  };

  // Render cart summary UI
  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax(18%)</span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Total</span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "Cash"}
        </button>
        <button
          className="btn btn-warning flex-grow-1"
          onClick={() => completePayment("upi")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "UPI"}
        </button>
      </div>

      <div className="d-flex gap-3 mt-2">
        <button
          className="btn btn-primary flex-grow-1"
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>
      {showPopup && (
        <RecieptPopup
          orderDetails={{
            ...orderDetails,
            razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
            razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
          }}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
