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

function App() {
  const { user, authUserCheck, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authUserCheck();
  }, [authUserCheck]);

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
