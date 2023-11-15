import { useEffect, useState } from "react";
import RestaurentData from "./RestaurentData";
import { API_DATA } from "../utils/constants";
import { Link } from "react-router-dom";
import { ShimmerUI } from "./ShimmerUI";
import useOnlineStatus from "../utils/useOnlineStatus";
import useHomeData from "../utils/useHomeData";

const Body = () => {
  const [search, setSearch] = useState("");
  const onlineStatus = useOnlineStatus();
  const { resData, filteredRes, setFilteredRes } = useHomeData();

  if (onlineStatus === false)
    return <h1>Your are offline! please check your internet connection</h1>;

  return resData.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="flex flex-col gap-4 justify-center items-center mx-2 my-2">
        <div className="search-container">
          <input
            className="border rounded-sm mx-2 my-2 indent-1"
            type="search"
            placeholder="search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="border border-orange-200 rounded-md px-2 py-1 text-sm hover:bg-orange-200 hover:text-black-400"
            onClick={() => {
              const searchFilter = resData.filter((item) =>
                item.info.name.toLowerCase().includes(search.toLowerCase())
              );
              setFilteredRes(searchFilter);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="border border-orange-200 rounded-md px-2 py-1 text-sm hover:bg-orange-200 hover:text-black-400"
            onClick={() => {
              const filteredData = resData.filter(
                (item) => item.info.avgRating >= 4
              );
              setFilteredRes(filteredData);
            }}
          >
            Top Rated Restaurents
          </button>
        </div>
      </div>
      <div className="mx-4 my-4 flex flex-wrap justify-center items-center gap-4 pb-4 pt-4">
        {filteredRes?.map((swiggyData) => (
          <Link
            key={swiggyData.info.id}
            to={`/restaurant/${swiggyData.info.id}`}
          >
            <RestaurentData swiggyData={swiggyData} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
