import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCart";

const TopPicksCard = ({ product }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const handleCartClick = () => {
    if (!user) {
      toast("Please login to continue shopping", {
        icon: "𝒊",
      });
      navigate("/signin");
    } else {
      addToCart(product);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-[250px] mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between p-2 space-y-1">
        <h5 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h5>

        <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
          ${product.price}
        </div>

        <button
          className="mt-2 flex items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
          onClick={handleCartClick}
        >
          <ShoppingCart size={14} className="mr-1" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TopPicksCard;
