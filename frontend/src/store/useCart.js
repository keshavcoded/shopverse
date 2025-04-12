import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => {
  return {
    cart: [],
    voucher: null,
    total: 0,
    subtotal: 0,
    isVoucherApplied: false,

    getCart: async () => {
      try {
        const res = await axiosInstance.get("/cart");
        set({ cart: res.data.cartItems });
        get().calculateTotal();
      } catch (error) {
        set({ cart: [] });
        console.log(error.message);
      }
    },

    addToCart: async (product) => {
      try {
        await axiosInstance.post("/cart", { productId: product._id });
        toast.success("Added to cart");
        set((prevState) => {
          const existingItem = prevState.cart.find(
            (item) => item._id === product._id
          );
          const updatedCart = existingItem
            ? prevState.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...prevState.cart, { ...product, quantity: 1 }];
          return { cart: updatedCart };
        });
        get().calculateTotal();
      } catch (error) {
        console.log(error.message);
        toast.error("Error while adding to cart");
      }
    },

    removeFromCart: async (productId) => {
      try {
        await axiosInstance.delete("/cart", { data: { productId } });
        set((prevState) => ({
          cart: prevState.cart.filter((item) => item._id !== productId),
        }));
        get().calculateTotal();
      } catch (error) {
        console.log(error.message);
      }
    },

    updateQuantity: async (productId, quantity) => {
      try {
        if (quantity === 0) {
          get().removeFromCart(productId);
          return;
        }

        await axiosInstance.put(`/cart/${productId}`, { quantity });
        set((prevState) => ({
          cart: prevState.cart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        }));
        get().calculateTotal();
      } catch (error) {
        console.log(error.message);
      }
    },

    calculateTotal: () => {
      const { cart, voucher } = get();
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      let total = subtotal;

      if (voucher) {
        const discount = subtotal * (voucher.discountPercent / 100);
        total = subtotal - discount;
      }

      set({ subtotal, total });
    },

    clearCart: async () => {
      try {
        await axiosInstance.delete("/cart");
        set({ cart: [], voucher: null, total: 0, subtotal: 0 });
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred");
      }
    },
  };
});
