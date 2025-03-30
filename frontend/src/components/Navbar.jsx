import { Link } from "react-router-dom";
import {
  FolderLock,
  LogOut,
  LucideHome,
  Menu,
  ShoppingCart,
} from "lucide-react";
import Tooltip from "./Tooltip";

const Navbar = () => {
  const user = true;
  const isAdmin = true;



  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl z-40 transition-all duration-300 border-b border-gray-400">
      <div className="container mx-auto px-4 py-3 flex justify-between max-w-7xl">
        <Link to={"/"} className="items-center space-x-2 flex">
          <img
            src="/logo.png"
            alt="logo"
            className="w-30 sm:w-50 m-3 sm:h-10"
          />
        </Link>
        {/* desktops */}
        <nav className="flex flex-wrap items-center gap-1 min-[410px]:gap-5">
          {/* home */}

          <Tooltip text={"Home"}>
            <Link to={"/"} className="">
              <LucideHome className="transition-transform duration-300 ease-in-out hover:scale-110 w-5 h-7 sm:w-7 sm:h-9" />
            </Link>
          </Tooltip>
          {/* cart */}
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
                <span className="hidden sm:inline">Dashbord</span>
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
                className="text-center text-xs sm:text-base px-2 py-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="bg-blue-600 text-white text-xs sm:text-base text-center px-2 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out"
              >
                Signup
              </Link>
            </>
          )}
          <div className="min-[410px]:hidden">
            <Menu size={10} className="cursor-pointer h-5 w-5" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
