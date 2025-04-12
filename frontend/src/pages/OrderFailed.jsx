import { XCircle, ArrowLeft } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-100 rounded-lg shadow-xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Your purchase has been cancelled. No charges have been made.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 text-center">
              If you encountered any issues during the payment process, please
              don&apos;t hesitate to contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full bg-gray-900 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg text-sm transition duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderFailed;
