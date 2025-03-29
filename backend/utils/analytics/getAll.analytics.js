import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";

export const getAll_Analytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const ordersData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$checkoutAmount" },
      },
    },
  ]);

  const { totalOrders, totalRevenue } = ordersData[0] || {
    totalOrders: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    orders: totalOrders,
    revenue: totalRevenue,
  };
};
