// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCart";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const VoucherCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const {
    voucher,
    vouchers,
    isVoucherApplied,
    getVoucher,
    applyVoucher,
    removeVoucher,
  } = useCartStore();

  useEffect(() => {
    getVoucher();
  }, [getVoucher]);

  useEffect(() => {
    if (voucher && isVoucherApplied) setUserInputCode(voucher.code);
  }, [voucher, isVoucherApplied]);

  const handleApplyVoucher = () => {
    if (!userInputCode) return;
    applyVoucher(userInputCode);
  };

  const handleRemoveVoucher = async () => {
    await removeVoucher();
    setUserInputCode("");
  };

  console.log("Voucher", voucher);

  const availableVouchers = vouchers || (Array.isArray(voucher) ? voucher : []);

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
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        <button
          className="w-1/2 mx-auto rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium cursor-pointer text-white hover:bg-gray-950 transition-colors duration-200"
          onClick={handleApplyVoucher}
        >
          Apply code
        </button>
      </div>

      {isVoucherApplied && voucher && !Array.isArray(voucher) && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-gray-700">
            Voucher Applied!
          </h3>
          <button
            className="mt-2 mx-auto flex items-center justify-center rounded-lg bg-white px-1 py-0.5 text-sm font-semibold shadow-xl text-green-600 hover:text-red-700 transition-colors duration-200 cursor-pointer"
            onClick={handleRemoveVoucher}
          >
            {voucher.code}
            <X className=" ml-2 h-5 w-4" />
          </button>
        </div>
      )}

      {availableVouchers.length > 0 && (
        <div className="mt-4 text-center flex flex-col items-center">
          <h3 className="text-md text-gray-600 font-semibold">
            Your available vouchers
          </h3>
          <div className="flex gap-1">
            {availableVouchers.map((v, index) => (
              <p
                key={v.id || index}
                className="cursor-pointer rounded-lg shadow-md p-1 bg-white hover:text-green-600 font-semibold transition-colors duration-200 mt-2 text-xs text-gray-600"
                onClick={() => setUserInputCode(v.code)}
              >
                {v.code} - {v.discountPercent}% off
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VoucherCard;
