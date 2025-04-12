import { Loader2 } from "lucide-react";

const PaymentProcessing = () => {
  return (
    <div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
    >
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <Loader2 className="w-10 h-10 text-gray-700 animate-spin" />
        <h2 className="text-lg font-semibold text-gray-800">
          Processing your payment...
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Please don't close this window while we confirm your order.
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessing;
