import { Link } from "react-router-dom";
import { FolderLock, LogOut, LucideHome, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const user = true;
  const isAdmin = true;
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl z-40 transition-all duration-300 border-bottom border-gray-400">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <Link to={"/"} className="items-center space-x-2 flex">
          <img src="/logo.png" alt="logo" className="w-30 sm:w-50 m-3 h-10" />
        </Link>

        <nav className="flex flex-wrap items-center gap-4">
          <Link to={"/"} className="">
            <LucideHome
              className="transition-transform duration-300 ease-in-out hover:scale-110"
              size={25}
            />
          </Link>
          {user && (
            <Link to={"/cart"} className="relative group">
              <ShoppingCart
                className="inline-block mr-1 transition-transform duration-300 ease-in-out group-hover:scale-110"
                size={25}
              />
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 py-0.5 text-xs transition-transform duration-300 ease-in-out group-hover:scale-110">
                2
              </span>
            </Link>
          )}
          {isAdmin && (
            <Link className="bg-blue-600 text-white hover:bg-blue-800 px-2 py-1 rounded-md transition duration-300 ease-in-out flex items-center">
              <FolderLock
                className="inline-block mr-1"
                size={20}
                color="#ffffff"
              />
              <span className="hidden sm:inline">Dashbord</span>
            </Link>
          )}
          {user ? (
            <button className="cursor-pointer">
              <LogOut size={25} />
            </button>
          ) : (
            <button></button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
