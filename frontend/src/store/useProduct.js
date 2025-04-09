import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => {
  return {
    products: [],
    isAdding: false,
    isFetching: false,
    isToggling: false,
    isDeleting: false,
    topPicks: [],

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

    fetchProducts: async () => {
      set({ isFetching: true });
      try {
        const res = await axiosInstance.get("/products");
        set({ products: res.data.products, isFetching: false });
      } catch (error) {
        console.log("Error while fetching", error.message);
        toast.error("Oops! Error while fetching products");
        set({ isFetching: false });
      }
    },

    toggleFeaturedProduct: async (productId) => {
      set({ isToggling: true });
      try {
        const res = await axiosInstance.patch(`/products/${productId}`);
        set((prevProductsState) => ({
          products: prevProductsState.products.map((product) =>
            product._id === productId
              ? { ...product, isFeatured: res.data.updatedProduct.isFeatured }
              : product
          ),
          isToggling: false,
        }));
      } catch (error) {
        set({ isToggling: false });
        toast.error(error.response.data.error || "Failed to update product");
      }
    },

    deleteProduct: async (productId) => {
      set({ isDeleting: false });
      try {
        await axiosInstance.delete(`/products/${productId}`);
        set((prevProductsState) => ({
          products: prevProductsState.products.filter(
            (product) => product._id !== productId
          ),
          isDeleting: false,
        }));
      } catch (error) {
        set({ isDeleting: false });
        toast.error(
          error.response.data.error || "Error while deleting product"
        );
      }
    },

    fetchProductsByCategory: async (category) => {
      set({ isFetching: true });
      try {
        const res = await axiosInstance.get(`/products/category/${category}`);
        set({ products: res.data.categoryProducts, isFetching: false });
      } catch (error) {
        toast.error("Error while fetching products");
        set({ isFetching: false });
        console.log(error.message);
      }
    },

    fetchTopPicks: async () => {
      set({ isFetching: true });
      try {
        const res = await axiosInstance.get("/products/picks-for-you");
        set({ topPicks: res.data.recommendedProducts, isFetching: false });
      } catch (error) {
        console.log(error.message);
      }
    },
  };
});
