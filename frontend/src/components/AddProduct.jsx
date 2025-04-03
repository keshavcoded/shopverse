import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { InputField } from "./InputFields";
import {
  CheckCircle2,
  DollarSign,
  ListFilter,
  LucideLetterText,
  NotebookPen,
  Upload,
} from "lucide-react";
import { Button } from "./Button";
import { useProductStore } from "../store/useProduct";

const categories = [
  "Jeans",
  "T-shirts",
  "Shirts",
  "Shoes",
  "Glasses",
  "Jackets",
  "Hoodies",
  "Suits",
];

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { isAdding, addProduct } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("Error while adding a product : ", error.message);
    }
  };

  const handleImageinput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      //event listener
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-1 text-center text-xl sm:text-2xl font-bold text-gray-600">
          Add an Product
        </h2>
      </motion.div>
      <motion.div
        className="mt-4 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 max-w-xs sm:max-w-md mx-auto border-t-4 border-gray-200 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LucideLetterText
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
                <InputField
                  id={"name"}
                  type={"text"}
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder={"Enter product name"}
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute top-2 left-3 flex items-center pointer-events-none">
                  <NotebookPen
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
                <textarea
                  id={"description"}
                  type={"text"}
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  rows={"3"}
                  placeholder={"Enter product description"}
                  className="block w-full px-3 py-2 pl-10 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
                <InputField
                  id={"price"}
                  type={"number"}
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder={"Enter product price"}
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ListFilter
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
                <select
                  id={"name"}
                  name={"category"}
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  placeholder={"Select product category"}
                  className="block w-full px-3 py-2 pl-10 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                >
                  <option className="text-gray-400">Select a category</option>
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={handleImageinput}
              />
              <label
                className="cursor-pointer bg-gray-200 py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                htmlFor="image"
              >
                <Upload
                  className="h-5 w-5 text-gray-600 inline-block mr-2"
                  aria-hidden="true"
                />
                Upload Image
              </label>
              {newProduct.image && (
                <span className="ml-3 text-sm text-emerald-600 flex justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-1" />
                  Image uploaded
                </span>
              )}
            </div>
            <Button
              isLoading={isAdding}
              text={"Add Product"}
              loadingText={"Adding product..."}
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProduct;
