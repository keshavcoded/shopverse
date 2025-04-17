import { Link } from "react-router-dom";
import {
  FolderLock,
  LogOut,
  LucideHome,
  Menu,
  ShoppingCart,
} from "lucide-react";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { useAuthStore } from "../store/useAuth";
import { useCartStore } from "../store/useCart";

const Navbar = () => {
  const { user, signout } = useAuthStore();
  const isAdmin = user?.role === "admin";
  console.log("User here:", user);
  console.log(user?.role);
  console.log(isAdmin);

  const { cart } = useCartStore();
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const mobileMenuActiveToggler = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const handleClick = () => {
    signout();
    mobileMenuActiveToggler();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between max-w-7xl">
        {/* Logo */}
        <Link to={"/"} className="items-center space-x-2 flex">
          <img
            src="/logo.png"
            alt="logo"
            className="w-30 sm:w-40 m-3 sm:h-8"
            draggable="false"
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className="flex flex-wrap items-center gap-1 min-[440px]:gap-5">
          {/* Home */}
          <Tooltip text={"Home"}>
            <Link
              to={"/"}
              className="max-[300px]:hidden flex items-center group group-hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <LucideHome className="w-5 h-7 sm:w-6 sm:h-8" />
              <span className="ml-2 inline">Home</span>
            </Link>
          </Tooltip>

          {/* Cart */}
          {user && (
            <Tooltip text={"Cart"}>
              <Link
                to={"/cart"}
                className="max-[440px]:hidden relative flex items-center transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <ShoppingCart className="inline-block mr-1 transition-transform duration-300 ease-in-out w-5 h-7 sm:w-6 sm:h-8" />
                <span className="ml-2 inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 sm:-top-1 right-10 sm:right-9 bg-blue-500 text-white rounded-full px-1 sm:px-2 sm:py-0.5 text-xs transition-transform duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            </Tooltip>
          )}

          {/* Admin Dashboard */}
          {user && isAdmin && (
            <Tooltip text={"Admin Dashboard"}>
              <Link
                to={"/admin-dashboard"}
                className="bg-blue-600 text-white hover:bg-blue-800 px-2 py-1 sm:py-1 rounded-md transition duration-300 ease-in-out flex items-center max-[440px]:hidden"
              >
                <FolderLock
                  className="inline-block mr-1 w-5 h-7 sm:w-6 sm:h-8"
                  color="#ffffff"
                />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </Tooltip>
          )}

          {/* Signout */}
          {user ? (
            <Tooltip text={"Signout"}>
              <button
                className="cursor-pointer flex items-center gap-1 transition duration-300 ease-in-out hover:scale-110 max-[440px]:hidden"
                onClick={signout}
              >
                <LogOut className="w-5 h-7 sm:w-6 sm:h-8" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </Tooltip>
          ) : (
            <>
              <Link
                to={"/signin"}
                className="text-center px-2 py-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out max-[440px]:hidden"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="bg-blue-600 text-white text-center px-2 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out max-[440px]:hidden"
              >
                Signup
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="min-[440px]:hidden relative">
            <Menu
              size={24}
              className="cursor-pointer"
              onClick={mobileMenuActiveToggler}
            />

            {/* Mobile Menu */}
            {mobileMenuActive && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md flex flex-col p-2 space-y-2 text-sm">
                {/* Home */}
                <Link
                  to={"/"}
                  className="min-[300px]:hidden flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                >
                  <LucideHome className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-5 h-7 sm:w-6 sm:h-8" />
                  <span className="ml-2 inline">Home</span>
                </Link>
                {/* Cart */}
                {user && (
                  <Link
                    to={"/cart"}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    onClick={mobileMenuActiveToggler}
                  >
                    <ShoppingCart className="w-5 h-7" />
                    <span>Cart ({cart.length})</span>
                  </Link>
                )}

                {/* Admin Dashboard */}
                {user && isAdmin && (
                  <Link
                    to={"/admin-dashboard"}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md bg-blue-600 text-white"
                    onClick={mobileMenuActiveToggler}
                  >
                    <FolderLock className="w-5 h-7" />
                    <span>Dashboard</span>
                  </Link>
                )}

                {/* Signout */}
                {user ? (
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    onClick={handleClick}
                  >
                    <LogOut className="w-5 h-7" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to={"/signin"}
                      className="block text-center p-2 hover:bg-gray-100 rounded-md"
                      onClick={mobileMenuActiveToggler}
                    >
                      Sign In
                    </Link>
                    <Link
                      to={"/signup"}
                      className="block text-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                      onClick={mobileMenuActiveToggler}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
