import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 w-full shadow-xl rounded-lg transition-transform duration-500 ease-out hover:scale-105">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
          <img
            src={category.imageUrl}
            alt={category.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-semibold mb-2">
              {category.name}
            </h3>
            <p className="text-gray-200 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
