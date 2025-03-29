import { getAll_Analytics } from "../utils/analytics/getAll.analytics.js";
import { getDailyOrder_Analytics } from "../utils/analytics/getDailyOrder.analytics.js";

export const getAnalyticsData = async (req, res) => {
  try {
    const analyticsData = await getAll_Analytics();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailyOrderAnalyticsData = await getDailyOrder_Analytics(
      startDate,
      endDate
    );

    return res.status(200).json({
      analyticsData,
      dailyOrderAnalyticsData,
    });
  } catch (error) {
    console.log("Error in getAnalyticsData controller : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
