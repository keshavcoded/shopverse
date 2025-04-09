import { useEffect } from "react";
import { useProductStore } from "../store/useProduct";
import TopPicksCard from "./TopPicksCard";
import Loader from "./Loader";

const Recommended = () => {
  const { topPicks, fetchTopPicks, isFetching } = useProductStore();

  useEffect(() => {
    fetchTopPicks();
  }, [fetchTopPicks]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800">Picks for you</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {topPicks.map((product) => (
          <TopPicksCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
