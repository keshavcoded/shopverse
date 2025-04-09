// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingCart className="h-24 w-24 text-gray-700" />
      <h3 className="text-xl font-semibold">Your cart is empty</h3>
      <p className="text-gray-600">
        Add something before it starts overthinking its purpose
      </p>
      <Link
        className="mt-4 rounded-md bg-gray-700 px-6 py-2 text-gray-100 transition-colors hover:bg-gray-900"
        to={"/"}
      >
        Let’s Go Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
