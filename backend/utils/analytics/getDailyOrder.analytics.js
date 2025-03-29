import Order from "../../models/order.model.js";

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getDailyOrder_Analytics = async (startDate, endDate) => {
  try {
    const dailyOrderData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          revenue: { $sum: "$checkoutAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const dateArray = getDatesInRange(startDate, endDate);
    return dateArray.map((date) => {
      const matchedData = dailyOrderData.find((item) => item._id === date);

      return {
        date,
        orders: matchedData?.orders || 0,
        revenue: matchedData?.revenue || 0,
      };
    });
  } catch (error) {
    console.log("Error : ", error.message);
  }
};
