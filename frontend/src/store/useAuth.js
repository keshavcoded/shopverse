import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axios";

export const useAuthStore = create((set, get) => {
  return {
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isSigningOut: false,
    isSigningIn: false,

    authUserCheck: async () => {
      set({ isCheckingAuth: true });
      try {
        const res = await axiosInstance.get("/auth/user-profile");
        set({ user: res.data, isCheckingAuth: false });
      } catch (error) {
        console.log(error.message);
        set({ isCheckingAuth: false, user: null });
      }
    },

    signup: async ({ name, email, password, confirmPassword }) => {
      set({ isSigningUp: true });

      if (password !== confirmPassword) {
        set({ isSigningUp: false });
        return toast.error("Passwords do not match");
      }
      try {
        const res = await axiosInstance.post("/auth/signup", {
          name,
          email,
          password,
        });
        set({ user: res.data, isSigningUp: false });
        return toast.success("Signed up successfully");
      } catch (error) {
        if (!Array.isArray(error.response?.data?.errors)) {
          toast.error(error.response?.data?.message || "Signup failed");
        } else {
          /* already shown error marking */
          const shownFields = new Set();

          error.response.data.errors.forEach((err) => {
            if (!shownFields.has(err.field)) {
              toast.error(err.message);
              shownFields.add(err.field);
            }
          });
        }
        set({ isSigningUp: false, user: null });
      }
    },

    signin: async ({ email, password }) => {
      set({ isSigningIn: true });
      try {
        const res = await axiosInstance.post("/auth/signin", {
          email,
          password,
        });
        set({ user: res.data, isSigningIn: false });
        return toast.success("Signed in successfully");
      } catch (error) {
        if (!Array.isArray(error.response?.data?.errors)) {
          toast.error(error.response?.data?.message || "Signup failed");
        } else {
          /* already shown error marking */
          const shownFields = new Set();

          error.response.data.errors.forEach((err) => {
            if (!shownFields.has(err.field)) {
              toast.error(err.message);
              shownFields.add(err.field);
            }
          });
        }
        set({ isSigningIn: false, user: null });
      }
    },

    signout: async () => {
      set({ isSigningOut: true });
      try {
        await axiosInstance.post("/auth/signout");
        set({ user: null, isSigningOut: false });
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error while logging out");
        set({ isSigningOut: true });
      }
    },

    refreshToken: async () => {
      // Prevent multiple simultaneous refresh attempts
      if (get().checkingAuth) return;

      set({ checkingAuth: true });
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        set({ checkingAuth: false });
        return res.data;
      } catch (error) {
        set({ user: null, checkingAuth: false });
        throw error;
      }
    },
  };
});