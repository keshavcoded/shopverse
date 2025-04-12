// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle2, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useCartStore } from "../store/useCart";
import PaymentProcessing from "../components/PaymentProcessing";

const OrderSuccess = () => {
  const { clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentSuccess = async (sessionId) => {
      try {
        await axiosInstance.post("/payments/session-transaction-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session_id found in the url");
    }
  }, [clearCart]);

  if (isProcessing) {
    <PaymentProcessing />;
  }

  if (error) {
    throw error;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
            Your order has been placed!
          </h1>
          <p className="text-gray-500 text-center mb-2">
            Thank you for shopping with us. We're processing your order.
          </p>
          <p className="text-gray-400 text-center text-sm mb-6">
            Check your email for order details and futher updates.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order number</span>
              <span className="text-sm font-semibold text-blue-500">
                #634734
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Esitmated delivery</span>
              <span className="text-sm font-semibold text-gray-900">
                5-7 business days
              </span>
            </div>
          </div>
          <Link
            to={"/"}
            className="w-full bg-gray-900 hover:bg-gray-700 text-sm text-gray-200 font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            Continue shopping
            <MoveUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
