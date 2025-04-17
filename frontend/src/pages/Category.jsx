import { useEffect } from "react";
import { useProductStore } from "../store/useProduct";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";

const Category = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center text-2xl sm:text-4xl font-bold text-gray-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-bold text-gray-700 text-center col-span-full">
              No products found.
            </h2>
          )}

          {products?.map((product) => (
            <ItemCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Category;
