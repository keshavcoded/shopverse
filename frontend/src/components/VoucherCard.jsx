// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCart";

const VoucherCard = () => {
  const { voucher, isVoucherApplied } = useCartStore();
  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-100 bg-gray-100 p-4 shadow-md sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-600 text-center"
          >
            Apply Voucher or Gift Card
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-1/2 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-700 focus:ring-gray-900"
            placeholder="Enter code here"
            required
          />
        </div>

        <button className="w-1/2 mx-auto rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium cursor-pointer text-white hover:bg-gray-950 transition-colors duration-200 focus:outline focus:ring-4 focus:ring-gray-800">
          Apply code
        </button>
      </div>

      {isVoucherApplied && voucher && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-gray-700">Voucher Applied</h3>
          <p className="mt-2 text-sm text-gray-600">
            {voucher.code} - {voucher.discountPercent}% off
          </p>
          <button className="mt-2 mx-auto flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">
            Remove Voucher
          </button>
        </div>
      )}

      {voucher && (
        <div className="mt-4 text-center">
          <h3>Your available voucher:</h3>
          <p>
            {voucher.code} - {voucher.discountPercent}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VoucherCard;
