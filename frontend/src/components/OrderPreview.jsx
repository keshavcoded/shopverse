// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCart";
import { Link } from "react-router-dom";
import { MoveUpRight } from "lucide-react";

const OrderPreview = () => {
  const { total, subtotal, voucher, isVoucherApplied } = useCartStore();

  const discount = subtotal - total;

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedDiscount = discount.toFixed(2);

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-100 bg-gray-100 p-4 shadow-md sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-gray-800">Order Summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-900">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900">
              ${formattedSubtotal}
            </dd>
          </dl>
          {discount > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-700">Discount</dt>
              <dd className="text-base font-medium text-gray-800">
                -${formattedDiscount}
              </dd>
            </dl>
          )}
          {voucher && isVoucherApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-700">
                Voucher ({voucher.code})
              </dt>
              <dt className="text-base font-medium text-gray-800">
                -{voucher.discountPercent}
              </dt>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-300 pt-2">
            <dt className="text-base font-bold text-gray-700">Total</dt>
            <dd className="text-base font-bold text-gray-900">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium cursor-pointer text-white hover:bg-blue-700 focus:outline focus:ring-4 focus:ring-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500">Forgot something?</span>
          <Link
            to={"/"}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline hover:text-gray-600 hover:no-underline"
          >
            Continue Shopping
            <MoveUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderPreview;
