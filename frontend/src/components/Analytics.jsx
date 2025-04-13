import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import AnalyticsCard from "./AnalyticsCard";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import Loader from "./Loader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dailyOrderData, setDailyOrderData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailyOrderData(res.data.dailyOrderAnalyticsData);
      } catch (error) {
        console.log("Error fetching analytics data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log("AnalyticsData : ", analyticsData);
  console.log("Daily order data : ", dailyOrderData);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title={"Total Users"}
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color={"from-emerald-500 to-teal-700"}
        />
        <AnalyticsCard
          title={"Total Products"}
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color={"from-emerald-500 to-green-700"}
        />
        <AnalyticsCard
          title={"Total Orders"}
          value={analyticsData.orders.toLocaleString()}
          icon={ShoppingBag}
          color={"from-emerald-500 to-cyan-700"}
        />
        <AnalyticsCard
          title={"Total Revenue"}
          value={`$${analyticsData.revenue.toLocaleString()}`}
          icon={DollarSign}
          color={"from-emerald-500 to-cyan-700"}
        />
      </div>
      <motion.div
        className="bg-gray-900 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart data={dailyOrderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"name"} stroke="#D1D5DB" />
            <YAxis yAxisId={"left"} stroke="#D1D5DB" />
            <YAxis yAxisId={"right"} stroke="#D1D5DB" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId={"left"}
              type={"monotone"}
              dataKey={"orders"}
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Orders"
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey={"revenue"}
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default Analytics;
