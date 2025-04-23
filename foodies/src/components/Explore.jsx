import React from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const Explore = ({categoriesList}) => {
    const navigate = useNavigate();
    console.log(categoriesList)
  return categoriesList && categoriesList.length > 0 ?  (
    <section className=" pb-8 px-8 mx-5 ">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore Our Menu
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Explore a curated list of dishes from top categories and satisfy your
          cravings with the best flavors.
        </p>
      </div>
      <div className="flex space-x-8">
        <Marquee pauseOnHover={true}>

        {categoriesList.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center py-4 mr-16 rounded-lg cursor-pointer "
            onClick={() => navigate(`/food/${category.id}`)}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-40 h-40 rounded-full object-contain mb-2  hover:scale-110"
            />
            <span className="text-lg font-medium">{category.name}</span>
          </div>
        ))}
        </Marquee>
      </div>
    </section>
  ): (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">No categories available</p>
    </div>
  );
};

export default Explore;