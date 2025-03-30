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

const Navbarv2 = () => {
  const user = true;
  const isAdmin = false;

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const mobileMenuActiveToggler = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl z-40 transition-all duration-300 border-b border-gray-400">
      <div className="container mx-auto px-4 py-3 flex justify-between max-w-7xl">
        {/* Logo */}
        <Link to={"/"} className="items-center space-x-2 flex">
          <img
            src="/logo.png"
            alt="logo"
            className="w-30 sm:w-50 m-3 sm:h-10"
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className="flex flex-wrap items-center gap-1 min-[410px]:gap-5">
          {/* Home */}
          <Tooltip text={"Home"}>
            <Link to={"/"} className="">
              <LucideHome className="transition-transform duration-300 ease-in-out hover:scale-110 w-5 h-7 sm:w-7 sm:h-9" />
            </Link>
          </Tooltip>

          {/* Cart */}
          {user && (
            <Tooltip text={"Cart"}>
              <Link to={"/cart"} className="relative group max-[410px]:hidden">
                <ShoppingCart className="inline-block mr-1 transition-transform duration-300 ease-in-out group-hover:scale-110 w-5 h-7 sm:w-7 sm:h-9" />
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 py-0.5 text-xs transition-transform duration-300 ease-in-out group-hover:scale-110">
                  2
                </span>
              </Link>
            </Tooltip>
          )}

          {/* Admin Dashboard */}
          {user && isAdmin && (
            <Tooltip text={"Admin Dashboard"}>
              <Link className="bg-blue-600 text-white hover:bg-blue-800 px-2 py-1 sm:py-1 rounded-md transition duration-300 ease-in-out flex items-center max-[410px]:hidden">
                <FolderLock
                  className="inline-block mr-1 w-5 h-7 sm:w-7 sm:h-9"
                  color="#ffffff"
                />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </Tooltip>
          )}

          {/* Signout */}
          {user ? (
            <Tooltip text={"Signout"}>
              <button className="cursor-pointer transition duration-300 ease-in-out hover:scale-110 max-[410px]:hidden">
                <LogOut className="w-5 h-7 sm:w-7 sm:h-9" />
              </button>
            </Tooltip>
          ) : (
            <>
              <Link
                to={"/signin"}
                className="text-center text-xs sm:text-base px-2 py-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out max-[410px]:hidden"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="bg-blue-600 text-white text-xs sm:text-base text-center px-2 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out max-[410px]:hidden"
              >
                Signup
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="min-[410px]:hidden relative">
            <Menu
              size={24}
              className="cursor-pointer"
              onClick={mobileMenuActiveToggler}
            />

            {/* Mobile Menu */}
            {mobileMenuActive && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md flex flex-col p-2 space-y-2">
                {/* Cart */}
                {user && (
                  <Link
                    to={"/cart"}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    onClick={mobileMenuActiveToggler}
                  >
                    <ShoppingCart className="w-5 h-7" />
                    <span>Cart (2)</span>
                  </Link>
                )}

                {/* Admin Dashboard */}
                {user && isAdmin && (
                  <Link
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
                    onClick={mobileMenuActiveToggler}
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

export default Navbarv2;
