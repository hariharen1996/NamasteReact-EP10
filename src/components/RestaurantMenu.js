import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import { MenuShimmer } from "./ShimmerUI";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [show, setShow] = useState(false);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const onChange = () => {
    setShow(!show);
  };

  if (resInfo.data === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines, avgRating, sla, areaName, totalRatingsString } =
    resInfo.data;

  const offers = resInfo.data.aggregatedDiscountInfo.descriptionList;

  const menuFilter = () => {
    if (show) {
      return resInfo.menuItems.filter(
        (item) => item.itemAttribute.vegClassifier === "VEG"
      );
    } else {
      return resInfo.menuItems.filter((item) => item);
    }
  };

  return (
    <div className="menu-container flex flex-col justify-center items-center w-[100%] py-5">
      <div className="border border-gray-100 rounded-md w-[90%] md:w[70%] shadow-md">
        <div className="flex flex-col md:flex-row justify-between p-2">
          <div className="leading-7">
            <h1 className="text-lg font-bold">{name}</h1>
            <span className="text-sm">👨‍🍳{cuisines.join(", ")}</span>
            <br />
            <span className="text-sm">
              ↪ {areaName}, {sla.slaString}
            </span>
          </div>
          <div className="rating-container">
            <p className="text-sm mt-1">⭐ {avgRating}</p>
            <p className="text-sm mt-1">® {totalRatingsString}</p>
          </div>
        </div>
        <hr className="bg-gray-400" />
        <div className="p-2">
          <p className="fee-text">
            ❗Far (4 kms) | Additional delivery fee will apply
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 my-5">
        <div className="border border-gray-100 rounded-md p-3 hover:shadow-md cursor-pointer">
          <p className="text-sm">🔄 {offers[0].meta}</p>
        </div>
        <div className="border border-gray-100 rounded-md p-3 hover:shadow-md cursor-pointer">
          <p className="text-sm">🔄 {offers[1].meta}</p>
        </div>
      </div>

      <div className="self-start mx-5">
        <label htmlFor="veg" className="m-2 text-sm">
          Veg Only
        </label>
        <input type="checkbox" checked={show} name="veg" onChange={onChange} />
      </div>
      <hr className="bg-gray-400 w-[99%] my-3" />
      <h1 className="menu-title self-start mx-5 font-bold text-lg">
        Recommmended ({resInfo.menuItems.length})
      </h1>
      <div className="itemcards-container my-2">
        {menuFilter().map((item, index) => {
          const {
            name,
            defaultPrice,
            price,
            description,
            imageId,
            itemAttribute,
          } = item;
          const { vegClassifier } = itemAttribute;

          return (
            <div
              className="menu-desc-container my-5 rounded-md flex justify-between items-center mx-5 shadow-md p-2 gap-10 "
              key={item?.imageId === imageId ? index : item?.imageId}
            >
              <div>
                <h1 className="menu-name text-lg font-bold">
                  {name}
                  <span
                    className={
                      vegClassifier === "VEG"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    <sup>{vegClassifier === "VEG" ? "VEG" : "NON-VEG"}</sup>
                  </span>
                </h1>
                <p className="text-sm leading-7">
                  Rs. {defaultPrice / 100 || price / 100}
                </p>
                <p className="text-sm md:w-[500px]">{description}</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  alt={name}
                  className="w-full md:w-auto h-24"
                  src={
                    item.imageId
                      ? `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`
                      : "https://cdn-images-1.medium.com/max/1600/1*oj-8G0PTm_zsbzryG1SzQA.png"
                  }
                />
                <button className="border border-green-400 px-5 mt-2 rounded-md text-sm hover:bg-green-200">
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
