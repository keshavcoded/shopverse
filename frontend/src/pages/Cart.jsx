// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCart";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import Recommended from "../components/Recommended";

const Cart = () => {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {cart.length === 0 && <EmptyCart />}
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>{" "}
            {cart.length > 0 && <Recommended />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
