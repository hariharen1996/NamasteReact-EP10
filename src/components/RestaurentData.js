import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurentData = ({ swiggyData }) => {
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    deliveryTime,
    avgRating,
  } = swiggyData?.info;
  return (
    <div className="bg-gray-100 w-80 p-2">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        className="h-48 w-[100%]"
      />

      <h3 className="text-lg font-bold my-2">{name}</h3>
      <div className="text-sm leading-7">
        <p>{cuisines.join(", ")}</p>
        {deliveryTime && <p>DeliveryTime: {deliveryTime}</p>}
        <p>{costForTwo}</p>
        <p>⭐ {avgRating}</p>
      </div>
    </div>
  );
};

export default RestaurentData;
