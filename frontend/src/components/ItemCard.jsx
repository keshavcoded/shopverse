import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCart";

const ItemCard = ({ product }) => {
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
    <div className="flex flex-col w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full bg-gray-100 flex items-center justify-center p-4 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product content */}
      <div className="flex flex-col justify-between p-5 h-full">
        <h5 className="text-lg font-semibold tracking-tight text-gray-800 line-clamp-2">
          {product.name}
        </h5>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">
            ${product.price}
          </span>
        </div>

        <button
          className="mt-5 flex items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          onClick={handleCartClick}
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
