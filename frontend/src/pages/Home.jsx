// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../store/useProduct";
import { useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/Jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/T-shirts", name: "T-shirts", imageUrl: "/tees.jpg" },
  { href: "/Shirts", name: "Shirts", imageUrl: "/shirts.jpg" },
  { href: "/Shoes", name: "Shoes", imageUrl: "/shoes2.jpg" },
  { href: "/Glasses", name: "Glasses", imageUrl: "/sunglasses.jpg" },
  { href: "/Jackets", name: "Jackets", imageUrl: "/jacket.jpg" },
  { href: "/Hoodies", name: "Hoodies", imageUrl: "/hoodies.png" },
  { href: "/Suits", name: "Suits", imageUrl: "/suits.jpg" },
];

const Home = () => {
  const { fetchFeaturedProducts, products, isFetchingFeat } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden"
      >
        <img
          src="/cover.png"
          alt="Fashion Cover"
          className="w-full h-full object-cover"
          loading="eager"
          draggable="false"
        />
        <h2 className="absolute top-4 left-4 sm:top-40 sm:left-8 text-gray-700 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl max-w-[1240px] font-bold z-10 px-3 py-2 rounded-md">
          Find modern looks
          <span className="block">for the modern you.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-medium text-gray-700 mb-4">
          Elevate Your Style with Our Collection
        </h1>
        <p className="text-md sm:text-xl text-gray-600 mb-12">
          Find What You Love – Shop by Category!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        {!isFetchingFeat && products?.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </motion.div>
    </div>
  );
};

export default Home;
