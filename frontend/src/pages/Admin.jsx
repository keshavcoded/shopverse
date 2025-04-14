import { BarChart3, PlusSquare, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AddProduct from "../components/AddProduct";
import Products from "../components/Products";
import Analytics from "../components/Analytics";
const tabs = [
  { id: "create", label: "Add Product", icon: PlusSquare },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [ismaxScreenLimit, setIsMaxScreenLimit] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMaxScreenLimit(window.innerWidth < 776);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (ismaxScreenLimit) {
    return (
      <div className="h-screen px-4 flex justify-center items-center text-center font-semibold text-gray-600">
        Please login through Tablet/iPad/PC to access the Admin Dashboard
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-center text-2xl sm:text-3xl font-bold mb-8 text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-1">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` cursor-pointer flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <tab.icon className="mr-2 h5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
        {activeTab === "create" && <AddProduct />}
        {activeTab === "products" && <Products />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
};

export default Admin;
