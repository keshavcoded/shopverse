import { useEffect } from "react";
import { useProductStore } from "../store/useProduct";
import { useParams } from "react-router-dom";

const Category = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  console.log("Products : ", products);

  return <div>Category Page</div>;
};

export default Category;
