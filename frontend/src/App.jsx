import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuth";
import { useEffect } from "react";
import Loader from "./components/Loader";
import Admin from "./pages/Admin";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import { useCartStore } from "./store/useCart";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailed from "./pages/OrderFailed";

function App() {
  const { user, authUserCheck, isCheckingAuth } = useAuthStore();
  const { getCart } = useCartStore();

  useEffect(() => {
    authUserCheck();
  }, [authUserCheck]);

  useEffect(() => {
    if (!user) return;
    getCart();
  }, [user, getCart]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to={"/"} />}
          />
          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? <Admin /> : <Navigate to={"/signin"} />
            }
          />
          <Route path="/category/:category" element={<Category />} />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/purchase-success"
            element={user ? <OrderSuccess /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <OrderFailed /> : <Navigate to={"/signin"} />}
          />
        </Routes>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#fff",
            color: "#545454",
            borderRadius: "10px",
          },
        }}
      />
    </div>
  );
}

export default App;
