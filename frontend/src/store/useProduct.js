import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => {
  return {
    products: [],
    isAdding: false,

    setProducts: (products) => set({ products }),

    addProduct: async (productData) => {
      set({ isAdding: true });
      try {
        const res = await axiosInstance.post("/products", productData);
        set((prevState) => {
          return {
            products: [...prevState.products, res.data],
            isAdding: false,
          };
        });
        toast.success("Product added succesfully");
      } catch (error) {
        toast.error(error || "Error while adding");
        set({ isAdding: false });
      }
    },
  };
});
