import { useEffect, useState } from "react";
import TopPicksCard from "./TopPicksCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextItems = () => {
    if (currentIndex + itemsPerPage < featuredProducts.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const prevItems = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const isInitial = currentIndex === 0;
  const isEnd = currentIndex + itemsPerPage >= featuredProducts.length;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-4xl font-semibold text-gray-700 mb-8">
          Featured products
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${featuredProducts.length * (100 / itemsPerPage)}%`,
                transform: `translateX(-${
                  (100 / featuredProducts.length) * currentIndex
                }%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / featuredProducts.length}%` }}
                >
                  <TopPicksCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevItems}
            disabled={isInitial}
            className={`absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-md ${
              isInitial
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-400 hover:cursor-pointer text-gray-700"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextItems}
            disabled={isEnd}
            className={`absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-md ${
              isEnd
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-400 hover:cursor-pointer text-gray-700 "
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
